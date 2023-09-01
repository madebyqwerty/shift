package scan

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/madebyqwerty/shift/handlers"
	openapi "github.com/madebyqwerty/shift/openapi"
	"github.com/madebyqwerty/shift/rabbitmq"
	"github.com/madebyqwerty/shift/utils/flags"
)

func ScanComplete(c *fiber.Ctx) error {
	absenceData := new(openapi.ScanComplete)
	fmt.Println(string(c.Body()))
	if err := c.BodyParser(absenceData); err != nil {
		log.Println(flags.Fiber, err)
		return c.Status(400).JSON(fiber.Map{
			"errors": []string{"fiber/failed-to-parse-body"},
		})
	}

	absenceDataJSON, _ := json.Marshal(absenceData)

	err := rabbitmq.PublishToQueue(Channel, ScanCompleteQueue, absenceDataJSON)
	if err != nil {
		return handlers.SendError(c, 500, err)
	}

	c.JSON(fiber.Map{
		"status":  "OK",
		"message": "rabbitmq/send-to-scan-complete-queue",
	})

	return nil
}
