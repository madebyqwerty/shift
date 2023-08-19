package handlers

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/madebyqwerty/shift/rabbitmq"
	amqp "github.com/rabbitmq/amqp091-go"
)

func send500onError(err error, c *fiber.Ctx) error {
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return nil
}

func CreateUser(c *fiber.Ctx) error {
	ch, err := rabbitmq.Conn.Channel()
	send500onError(err, c)
	defer ch.Close()

	q, err := ch.QueueDeclare("create-user", false, false, true, false, nil)
	send500onError(err, c)

	msgs, err := ch.Consume(q.Name, "", true, false, false, false, nil)
	send500onError(err, c)

	corrId := uuid.New().String()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = ch.PublishWithContext(ctx, "", "create-user", false, false, amqp.Publishing{
		ContentType:   "text/plain",
		CorrelationId: corrId,
		ReplyTo:       q.Name,
		Body:          []byte(c.Body()),
	})

	return nil
}
