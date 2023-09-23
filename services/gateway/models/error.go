package models

type ErrorMessage string

const (
	FailedToPublisToScanQueue ErrorMessage = "rabbitmq/failed-to-publish-to-scan-queue"
	FailedToParseFile         ErrorMessage = "fiber/failed-to-parse-file"
	FailedToConvertFile       ErrorMessage = "fiber/failed-to-convert-to-base64"
	FormWeekNumberMissing     ErrorMessage = "form/week_number-missing"
	FailedToPublisToOcrQueue  ErrorMessage = "rabbitmq/failed-to-publish-to-ocr-queue"
	FailedToParseBody         ErrorMessage = "fiber/failed-to-parse-body"
)

type Error struct {
	Errors []ErrorMessage `json:"errors"`
	Error  ErrorMessage   `json:"error"`
}
