package scan

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/madebyqwerty/shift/rabbitmq"
)

// Sends back the status of scanning back to client using websockets
func ScanWs(c *websocket.Conn) {
	ch, err := rabbitmq.Conn.Channel()

	if err != nil {
		c.WriteJSON(fiber.Map{
			"error": "Could not connect to queue, make sure you have the correct id",
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
			"error": "Could not connect to queue, make sure you have the correct id",
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
			"error": "Could not connect to queue, make sure you have the correct id",
		})
	}

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			fmt.Println(string(d.Body))

			var dat map[string]interface{}
			if err := json.Unmarshal(d.Body, &dat); err != nil {
				log.Fatalln(err)
			}

			if dat["status"] == "done" {
				c.WriteJSON(fiber.Map{
					"status": "done",
					"data":   dat["data"],
				})
				c.Close()
				ch.Close()
				break
			}

			c.WriteJSON(fiber.Map{
				"data": string(d.Body),
			})
		}
	}()

	<-forever
}
