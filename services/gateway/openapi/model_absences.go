/*
Database service API

REST API for interacting with the database service.

API version: 0.0.1
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package openapi

import (
	"encoding/json"
)

// checks if the Absences type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &Absences{}

// Absences struct for Absences
type Absences struct {
	// When the user has more than one hour of absence, every hour of his absence will be in this array with a user_id.
	Id *string `json:"id,omitempty"`
	// The name of the user.
	Name *string `json:"name,omitempty"`
	// Only one hour of absence, if he has another hour it will be in another item in this list.
	Absence *float32 `json:"absence,omitempty"`
	// The date of the absence.
	Date *string `json:"date,omitempty"`
}

// NewAbsences instantiates a new Absences object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewAbsences() *Absences {
	this := Absences{}
	return &this
}

// NewAbsencesWithDefaults instantiates a new Absences object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewAbsencesWithDefaults() *Absences {
	this := Absences{}
	return &this
}

// GetId returns the Id field value if set, zero value otherwise.
func (o *Absences) GetId() string {
	if o == nil || IsNil(o.Id) {
		var ret string
		return ret
	}
	return *o.Id
}

// GetIdOk returns a tuple with the Id field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *Absences) GetIdOk() (*string, bool) {
	if o == nil || IsNil(o.Id) {
		return nil, false
	}
	return o.Id, true
}

// HasId returns a boolean if a field has been set.
func (o *Absences) HasId() bool {
	if o != nil && !IsNil(o.Id) {
		return true
	}

	return false
}

// SetId gets a reference to the given string and assigns it to the Id field.
func (o *Absences) SetId(v string) {
	o.Id = &v
}

// GetName returns the Name field value if set, zero value otherwise.
func (o *Absences) GetName() string {
	if o == nil || IsNil(o.Name) {
		var ret string
		return ret
	}
	return *o.Name
}

// GetNameOk returns a tuple with the Name field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *Absences) GetNameOk() (*string, bool) {
	if o == nil || IsNil(o.Name) {
		return nil, false
	}
	return o.Name, true
}

// HasName returns a boolean if a field has been set.
func (o *Absences) HasName() bool {
	if o != nil && !IsNil(o.Name) {
		return true
	}

	return false
}

// SetName gets a reference to the given string and assigns it to the Name field.
func (o *Absences) SetName(v string) {
	o.Name = &v
}

// GetAbsence returns the Absence field value if set, zero value otherwise.
func (o *Absences) GetAbsence() float32 {
	if o == nil || IsNil(o.Absence) {
		var ret float32
		return ret
	}
	return *o.Absence
}

// GetAbsenceOk returns a tuple with the Absence field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *Absences) GetAbsenceOk() (*float32, bool) {
	if o == nil || IsNil(o.Absence) {
		return nil, false
	}
	return o.Absence, true
}

// HasAbsence returns a boolean if a field has been set.
func (o *Absences) HasAbsence() bool {
	if o != nil && !IsNil(o.Absence) {
		return true
	}

	return false
}

// SetAbsence gets a reference to the given float32 and assigns it to the Absence field.
func (o *Absences) SetAbsence(v float32) {
	o.Absence = &v
}

// GetDate returns the Date field value if set, zero value otherwise.
func (o *Absences) GetDate() string {
	if o == nil || IsNil(o.Date) {
		var ret string
		return ret
	}
	return *o.Date
}

// GetDateOk returns a tuple with the Date field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *Absences) GetDateOk() (*string, bool) {
	if o == nil || IsNil(o.Date) {
		return nil, false
	}
	return o.Date, true
}

// HasDate returns a boolean if a field has been set.
func (o *Absences) HasDate() bool {
	if o != nil && !IsNil(o.Date) {
		return true
	}

	return false
}

// SetDate gets a reference to the given string and assigns it to the Date field.
func (o *Absences) SetDate(v string) {
	o.Date = &v
}

func (o Absences) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o Absences) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if !IsNil(o.Id) {
		toSerialize["id"] = o.Id
	}
	if !IsNil(o.Name) {
		toSerialize["name"] = o.Name
	}
	if !IsNil(o.Absence) {
		toSerialize["absence"] = o.Absence
	}
	if !IsNil(o.Date) {
		toSerialize["date"] = o.Date
	}
	return toSerialize, nil
}

type NullableAbsences struct {
	value *Absences
	isSet bool
}

func (v NullableAbsences) Get() *Absences {
	return v.value
}

func (v *NullableAbsences) Set(val *Absences) {
	v.value = val
	v.isSet = true
}

func (v NullableAbsences) IsSet() bool {
	return v.isSet
}

func (v *NullableAbsences) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableAbsences(val *Absences) *NullableAbsences {
	return &NullableAbsences{value: val, isSet: true}
}

func (v NullableAbsences) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableAbsences) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


