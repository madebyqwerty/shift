package scan

import (
	"context"
	"encoding/json"
	"log"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/madebyqwerty/shift/utils"
	"github.com/madebyqwerty/shift/utils/flags"
	amqp "github.com/rabbitmq/amqp091-go"
)

type OcrResponse struct {
	Id         string `json:"id"`
	WeekNumber int64  `json:"week_number"`
	File       string `json:"img"`
}

type ScanResponse struct {
	Status string `json:"status"`
	ScanId string `json:"scan_id"`
}

func Scan(c *fiber.Ctx) error {
	file, err := c.FormFile("img")

	if err != nil {
		log.Println(flags.Fiber, err)
		return c.Status(400).JSON(fiber.Map{
			"errors": []string{"fiber/failed-to-parse-file"},
		})
	}

	res := new(OcrResponse)
	res.Id = uuid.NewString()

	if val, err := utils.FileToBase64(file); err != nil {
		log.Println(flags.Fiber, err)
		return c.Status(400).JSON(fiber.Map{
			"errors": []string{"fiber/failed-to-convert-to-base64"},
		})
	} else {
		res.File = val
	}

	if val, err := strconv.ParseInt(c.FormValue("week_number"), 0, 8); err != nil {
		log.Println(flags.Fiber, err)
		return c.Status(400).JSON(fiber.Map{
			"errors": []string{"form/week_number-missing"},
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
		return c.JSON(fiber.Map{
			"errors": []string{"rabbimq/failed-to-publish-to-orc-queue"},
		})
	}

	scanRes := ScanResponse{Status: "STARTED", ScanId: res.Id}

	scanResJson, _ := json.Marshal(scanRes)

	if err := Channel.PublishWithContext(ctx, "", ScanQueue.Name, false, false, amqp.Publishing{
		ContentType: "application/json",
		Body:        scanResJson,
	}); err != nil {
		log.Println(flags.RabbitMQ, err)
		return c.JSON(fiber.Map{
			"errors": []string{"rabbimq/failed-to-publish-to-scan-queue"},
		})
	}

	return c.JSON(fiber.Map{
		"scan_id": res.Id,
	})
}
