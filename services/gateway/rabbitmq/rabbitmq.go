package rabbitmq

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

var Conn *amqp.Connection

func Init(docker bool) {
	var err error
	var connectionUrl string

	if docker {
		connectionUrl = "amqp://guest:guest@rabbitmq:5672/"
	} else {
		connectionUrl = "amqp://guest:guest@localhost:5672/"
	}

	Conn, err = amqp.Dial(connectionUrl)
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %v", err)
	}
}
