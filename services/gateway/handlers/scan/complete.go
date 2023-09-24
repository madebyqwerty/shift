package scan

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/madebyqwerty/shift/models"
	"github.com/madebyqwerty/shift/mongo"
	"github.com/madebyqwerty/shift/utils/flags"
)

// ScanComplete completes a scan by inserting the scan's absences into a MongoDB collection.
// @Summary Complete a scan
// @Description Completes a scan by inserting the scan's absences into a MongoDB collection.
// @Accept json
// @Produce json
// @Param scan_id path string true "Scan ID"
// @Param body body models.Scan true "Request body"
// @Success 200 {object} models.Success
// @Failure 400 {object} models.Error
// @Failure 500 {object} models.Error
// @Router /scan/{scan_id}/complete [post]
func ScanComplete(c *fiber.Ctx) error {
	absenceData := new(models.Scan)
	if err := c.BodyParser(absenceData); err != nil {
		log.Println(flags.Fiber, err)
		return c.Status(400).JSON(models.Error{
			Error: models.FailedToParseBody,
		})
	}

	absencesCollection := mongo.GetCollection(mongo.DB, "absences")
	var absencesInterface []interface{}
	for _, absence := range absenceData.Absences {
		absencesInterface = append(absencesInterface, absence)
	}
	_, err := absencesCollection.InsertMany(context.Background(), absencesInterface)
	if err != nil {
		log.Println("Failed to insert data into MongoDB:", err)
		return c.Status(500).JSON(models.Error{
			Error: "Failed to insert data into MongoDB",
		})
	}

	return c.Status(200).JSON(models.Success{
		Message: models.SucccesMessage,
	})

	return nil
}
