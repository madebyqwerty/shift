package rabbitmq

import (
	"context"
	"errors"
	"log"
	"time"

	"github.com/madebyqwerty/shift/utils/flags"
	amqp "github.com/rabbitmq/amqp091-go"
)

func PublishToQueue(channel *amqp.Channel, queue amqp.Queue, data []byte) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

	defer cancel()

	if err := channel.PublishWithContext(ctx, "", queue.Name, false, false, amqp.Publishing{
		ContentType: "application/json",
		Body:        data,
	}); err != nil {
		log.Printf("%s Error publishing to %s queue %s", flags.RabbitMQ, queue.Name, err.Error())
		return errors.New("rabbitmq/failed-to-publish-to-" + queue.Name + "-queue")
	} else {
		log.Printf("%s Sending absence data to %s queue", flags.RabbitMQ, queue.Name)
	}
	return nil
}
