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
	absenceData := new(openapi.ScanCompleteScanIdPostRequest)
	if err := c.BodyParser(absenceData); err != nil {
		log.Println(flags.Fiber, err)
		return c.Status(400).JSON(fiber.Map{
			"errors": []string{"fiber/failed-to-parse-body"},
		})
	}

	fmt.Println(flags.Fiber, "scan_id:", c.Params("scan_id"))

	scanId := c.Params("scan_id")

	absenceDataWithScanId := make(map[string]interface{})

	absenceDataWithScanId["absences"] = absenceData.Absences
	absenceDataWithScanId["scan_id"] = scanId

	fmt.Printf("%#v\n", absenceDataWithScanId)

	absenceDataJSON, _ := json.Marshal(absenceDataWithScanId)

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
