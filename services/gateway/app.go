package main

import (
	"github.com/madebyqwerty/shift/handlers/scan"
	"github.com/madebyqwerty/shift/rabbitmq"

	"flag"
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

var (
	port = flag.String("port", ":5003", "Port to listen on")
	prod = flag.Bool("prod", false, "Enable prefork in Production")
)

func main() {
	// Parse command-line flags
	flag.Parse()

	// Create fiber app
	app := fiber.New(fiber.Config{
		Prefork: *prod, // go run app.go -prod
	})

	// Middleware
	app.Use(recover.New())
	app.Use(logger.New())

	// Setup websockets
	// @see https://docs.gofiber.io/contrib/websocket/#example
	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	// RabbitMQ
	rabbitmq.Init()
	defer rabbitmq.Conn.Close()

	// Routes
	scan.SetupScan(app)

	// Listen on port 3000
	log.Fatal(app.Listen("5003")) // go run app.go -port=:3000
}
