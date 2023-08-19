package scan

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/madebyqwerty/shift/rabbitmq"
	amqp "github.com/rabbitmq/amqp091-go"
)

var Queue amqp.Queue
var Channel *amqp.Channel

func SetupScan(app *fiber.App) {
	scan := app.Group("/scan")

	var err error
	Channel, err = rabbitmq.Conn.Channel()
	if err != nil {
		log.Fatalf("Error opening channel: %s", err)
	}

	var errq error

	Queue, errq = Channel.QueueDeclare(
		"ocr-queue",
		false,
		false,
		false,
		false,
		nil,
	)

	if errq != nil {
		log.Fatalf("Error declaring queue: %s", errq)
	}

	scan.Post("/", Scan)
}
