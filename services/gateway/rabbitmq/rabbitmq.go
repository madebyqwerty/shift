package rabbitmq

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

var Conn *amqp.Connection

func Init() {
	var err error
	Conn, err = amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %v", err)
	}
}
