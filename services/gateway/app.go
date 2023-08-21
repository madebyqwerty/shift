package main

import (
	"github.com/madebyqwerty/shift/handlers/scan"
	"github.com/madebyqwerty/shift/rabbitmq"

	"flag"
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/proxy"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

var (
	port   = flag.String("port", ":5003", "Port to listen on")
	prod   = flag.Bool("prod", false, "Enable prefork in Production")
	docker = flag.Bool("docker", false, "Enable docker mode")
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
	rabbitmq.Init(*docker)
	defer rabbitmq.Conn.Close()

	// Routes
	app.Get("/status", monitor.New())
	app.Static("/docs", "./docs")

	// Temporarily rewrite all request to /api to localhost:5000 until moved to gateway
	app.All("api/*", func(c *fiber.Ctx) error {
		return proxy.Do(c, "http://localhost:5000"+c.Path())
	})
	scan.SetupScan(app)

	// Listen on port
	log.Fatal(app.Listen(*port))
}
