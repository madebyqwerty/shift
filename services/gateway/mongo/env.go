package mongo

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/madebyqwerty/shift/utils/flags"
)

func EnvMongoURI() string {
	err := godotenv.Load("./env", "../../.env")
	if err != nil {
		log.Fatal(flags.GO, "Error loading .env file", err)
	}

	return os.Getenv("MONGOURI")
}
