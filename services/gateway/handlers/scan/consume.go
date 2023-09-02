package scan

import (
	"encoding/json"
	"log"
	"sync"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/madebyqwerty/shift/utils/flags"
	"github.com/rabbitmq/amqp091-go"
)

type client struct {
	isClosing bool
	mu        sync.Mutex
}

var clients = make(map[*websocket.Conn]*client) // Note: although large maps with pointer-like types (e.g. strings) as keys are slow, using pointers themselves as keys is acceptable and fast
var register = make(chan *websocket.Conn)
var unregister = make(chan *websocket.Conn)

// Sends back the status of scanning back to client using websockets
func ScanWs(c *websocket.Conn) {
	// Disconect clients when the function returns and close the connection
	defer func() {
		unregister <- c
		c.Close()
	}()

	log.Println(flags.Fiber, "New connection to websocket")
	register <- c

	for {
		_, _, err := c.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Println(flags.Fiber, "Failed to read a message from client", err)
			}

			return
		}
	}
}

func RunHub() {
	for {

		select {
		case connection := <-register:
			clients[connection] = &client{}
		case message := <-Broadcast:
			log.Println(flags.Fiber, "Received message", string(message.Body))
			for connection, c := range clients {
				go sendMessageBackToClient(message, connection, c)
			}
		case connection := <-unregister:
			delete(clients, connection)
			log.Println(flags.Fiber, "Unregistered websocket connection")
		}
	}
}

func sendMessageBackToClient(message amqp091.Delivery, connection *websocket.Conn, c *client) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.isClosing {
		return
	}

	var data map[string]interface{}
	if err := json.Unmarshal(message.Body, &data); err != nil {
		log.Println(flags.GO, "Failed to parse data:", string(message.Body), "error:", err)
		connection.WriteJSON(fiber.Map{
			"status": "ERROR",
			"errors": []string{"rabbitmq/failed-to-parse-data"},
		})
		return
	}

	if err := connection.WriteJSON(data); err != nil {
		log.Println(flags.Fiber, "Failed to send message to websocket", err)
		c.isClosing = true
		connection.WriteMessage(websocket.CloseMessage, []byte{})
		connection.Close()
		unregister <- connection
	} else {
		log.Println(flags.Fiber, "Succesfuly sent message to websocket")
		message.Ack(true)
	}
}
