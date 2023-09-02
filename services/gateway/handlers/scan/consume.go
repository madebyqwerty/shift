package scan

import (
	"encoding/json"
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/madebyqwerty/shift/rabbitmq"
	"github.com/madebyqwerty/shift/utils/flags"
)

// Sends back the status of scanning back to client using websockets
func ScanWs(c *websocket.Conn) {
	ch, err := rabbitmq.Conn.Channel()

	if err != nil {
		c.WriteJSON(fiber.Map{
			"errors": []string{"rabbitmq/failed-to-establish-connection"},
		})
		c.Close()
	}

	defer ch.Close()

	id := c.Params("id")
	scanId := "scan:" + id

	q, err := ch.QueueDeclare(
		scanId,
		false,
		false,
		false,
		false,
		nil,
	)

	if err != nil {
		c.WriteJSON(fiber.Map{
			"errors": []string{"rabbitmq/failed-to-declare-queue"},
		})
		c.Close()
		return
	}

	msgs, err := ch.Consume(
		q.Name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)

	if err != nil {
		c.WriteJSON(fiber.Map{
			"errors": []string{"rabbitmq/failed-to-consume-from-queue"},
		})
	}

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			var data map[string]interface{}
			if err := json.Unmarshal(d.Body, &data); err != nil {
				log.Println(flags.GO, "Failed to parse data:", string(d.Body), "error:", err)
				c.WriteJSON(fiber.Map{
					"status": "error",
					"errors": []string{"rabbitmq/failed-to-parse-data"},
				})
				return
			}

			_, _, err := c.ReadMessage()
			if err != nil {

				log.Println(err)
				log.Println(flags.Fiber, "Closing websocket connection")
				close(forever)
				break
			}

			log.Println(flags.Fiber, "Received message from scan:shift and sending it to websocket")
			if err := c.WriteJSON(data); err != nil {
				log.Println(flags.Fiber, "error sending message to scan:shift", err)
			}

		}
	}()

	<-forever

	log.Println("Ending connection for", id)
}
