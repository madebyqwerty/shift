package models

type Scan struct {
	ID       string    `json:"scan_id" bson:"_id"`
	Absences []Absence `json:"absences"`
}
