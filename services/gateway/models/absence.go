package models

type Absence struct {
	ID      string  `json:"absence_id" bson:"_id"`
	Student Student `json:"student"`
	Date    string  `json:"date"`
	Lesson  int     `json:"lesson"`
}
