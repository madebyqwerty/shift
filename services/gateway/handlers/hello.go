package handlers

import (
	"context"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/madebyqwerty/shift/rabbitmq"
	amqp "github.com/rabbitmq/amqp091-go"
)

func Hello(c *fiber.Ctx) error {

	ch, err := rabbitmq.Conn.Channel()
	if err != nil {
		log.Fatalf("Error opening channel: %s", err)
	}
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"welcome",
		false,
		false,
		false,
		false,
		nil,
	)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	body := "Hello World!"
	err = ch.PublishWithContext(ctx,
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		})

	log.Printf(" [x] Sent %s\n", body)
	return c.JSON(fiber.Map{
		"status": "message sent",
	})
}
