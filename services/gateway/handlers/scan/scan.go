package scan

import (
	"context"
	"encoding/json"
	"log"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/madebyqwerty/shift/models"
	"github.com/madebyqwerty/shift/utils"
	"github.com/madebyqwerty/shift/utils/flags"
	amqp "github.com/rabbitmq/amqp091-go"
)

type OcrMessage struct {
	Id         string `json:"id"`
	WeekNumber int64  `json:"week_number"`
	File       string `json:"img"`
}

type ScanResponse struct {
	Status string `json:"status"`
	ScanId string `json:"scan_id"`
}

// Scan
// @Summary Scan an image and start OCR processing
// @Description Scan an image and start OCR processing
// @Accept multipart/form-data
// @Produce json
// @Param img formData file true "Image file to be scanned"
// @Param week_number formData int true "Week number"
// @Success 200 {object} ScanResponse
// @Failure 400 {object} models.Error
// @Router /scan [post]
func Scan(c *fiber.Ctx) error {
	file, err := c.FormFile("img")

	if err != nil {
		log.Println(flags.Fiber, err)
		return c.Status(400).JSON(models.Error{
			Error: models.FailedToParseFile,
		})
	}

	res := new(OcrMessage)
	res.Id = uuid.NewString()

	if val, err := utils.FileToBase64(file); err != nil {
		log.Println(flags.Fiber, err)
		return c.Status(400).JSON(models.Error{
			Error: models.FailedToConvertFile,
		})
	} else {
		res.File = val
	}

	if val, err := strconv.ParseInt(c.FormValue("week_number"), 0, 8); err != nil {
		log.Println(flags.Fiber, err)
		return c.Status(400).JSON(models.Error{
			Error: models.FormWeekNumberMissing,
		})
	} else {
		res.WeekNumber = val
	}

	bodyJson, _ := json.Marshal(res)
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

	defer cancel()

	if err := Channel.PublishWithContext(ctx, "", OcrQueue.Name, false, false, amqp.Publishing{
		ContentType: "application/json",
		Body:        bodyJson,
	}); err != nil {
		log.Println(flags.RabbitMQ, err)
		return c.JSON(models.Error{
			Error: models.FailedToPublisToOcrQueue,
		})
	} else {
		log.Println(flags.RabbitMQ, "Sent image to be proccesed to OCR")
	}

	scanRes := ScanResponse{Status: "STARTED", ScanId: res.Id}

	scanResJson, _ := json.Marshal(scanRes)

	if err := Channel.PublishWithContext(ctx, "", ScanQueue.Name, false, false, amqp.Publishing{
		ContentType: "application/json",
		Body:        scanResJson,
	}); err != nil {
		log.Println(flags.RabbitMQ, err)
		return c.JSON(models.Error{
			Error: models.FailedToPublisToScanQueue,
		})
	} else {
		log.Println(flags.RabbitMQ, "Notified scan:shift of new scan")
	}

	return c.JSON(fiber.Map{
		"scan_id": res.Id,
	})
}
