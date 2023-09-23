package models

type Student struct {
	ID        string `json:"student_id" bson:"_id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}
