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
	amqp "github.com/rabbitmq/amqp091-go"
)

type Response struct {
	Id         string `json:"id"`
	WeekNumber int64  `json:"week_number"`
	File       string `json:"img"`
}

func Scan(c *fiber.Ctx) error {
	file, err := c.FormFile("img")

	if err != nil {
		log.Fatalln(err)
		return c.Status(400).JSON(err)
	}

	res := new(Response)
	res.Id = uuid.NewString()

	if val, err := utils.FileToBase64(file); err != nil {
		log.Fatalln(err)
		return c.Status(400).JSON(err)
	} else {
		res.File = val
	}

	if val, err := strconv.ParseInt(c.FormValue("week_number"), 0, 8); err != nil {
		log.Fatalln(err)
		return c.Status(400).JSON(err)
	} else {
		res.WeekNumber = val
	}

	bodyJson, err := json.Marshal(res)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

	defer cancel()

	if err != nil {
		log.Fatalln(err)
	}

	if err := Channel.PublishWithContext(ctx, "", Queue.Name, false, false, amqp.Publishing{
		ContentType: "application/json",
		Body:        bodyJson,
	}); err != nil {
		log.Fatalln(err)
		return c.JSON(fiber.Map{
			"status": "not-succes",
		})
	}

	return c.JSON(fiber.Map{
		"status": "succes",
		"id":     res.Id,
	})
}
