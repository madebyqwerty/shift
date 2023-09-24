package models

type SuccessMessage string

const (
	SucccesMessage SuccessMessage = "SUCCESS"
)

type Success struct {
	Message SuccessMessage `json:"message"`
}
