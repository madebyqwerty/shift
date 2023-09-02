package handlers

import "github.com/gofiber/fiber/v2"

func SendError(c *fiber.Ctx, status int, err error) error {
	return c.Status(status).JSON(fiber.Map{
		"errors": []string{err.Error()},
	})
}
