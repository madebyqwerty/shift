package scan

import (
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/madebyqwerty/shift/rabbitmq"
	"github.com/madebyqwerty/shift/utils/flags"
	amqp "github.com/rabbitmq/amqp091-go"
)

var OcrQueue amqp.Queue
var ScanQueue amqp.Queue
var ScanCompleteQueue amqp.Queue
var Channel *amqp.Channel

func SetupScan(app *fiber.App) {

	var err error
	Channel, err = rabbitmq.Conn.Channel()
	if err != nil {
		log.Fatalf("Error opening channel: %s", err)
	}

	var ocrErr error
	OcrQueue, ocrErr = Channel.QueueDeclare(
		"ocr-queue",
		false,
		false,
		false,
		false,
		nil,
	)

	if ocrErr != nil {
		log.Println(flags.RabbitMQ, "Error declaring queue", ocrErr)
	}

	var scanErr error
	ScanQueue, scanErr = Channel.QueueDeclare("scan:shift", false, false, false, false, nil)

	if scanErr != nil {
		log.Println(flags.RabbitMQ, "Error declaring queue", scanErr)
	}

	var scanCompleteErr error
	ScanCompleteQueue, scanCompleteErr = Channel.QueueDeclare("scan_complete", false, false, false, false, nil)
	if scanCompleteErr != nil {
		log.Println(flags.RabbitMQ, "Error declaring queue", scanErr)
	}

	scan := app.Group("/scan")
	scan.Post("/", Scan)
	app.Get("/ws/:id", websocket.New(ScanWs))
}
