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

// checks if the ScanCompleteAbsencesInner type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &ScanCompleteAbsencesInner{}

// ScanCompleteAbsencesInner struct for ScanCompleteAbsencesInner
type ScanCompleteAbsencesInner struct {
	// When the user has more than one hour of absence, every hour of his absence will be in this array with a user_id.
	UserId *string `json:"user_id,omitempty"`
	// Only one hour of absence, if he has another hour it will be in another item in this list.
	Absence *float32 `json:"absence,omitempty"`
	// The date of the absence.
	Date *string `json:"date,omitempty"`
}

// NewScanCompleteAbsencesInner instantiates a new ScanCompleteAbsencesInner object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewScanCompleteAbsencesInner() *ScanCompleteAbsencesInner {
	this := ScanCompleteAbsencesInner{}
	return &this
}

// NewScanCompleteAbsencesInnerWithDefaults instantiates a new ScanCompleteAbsencesInner object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewScanCompleteAbsencesInnerWithDefaults() *ScanCompleteAbsencesInner {
	this := ScanCompleteAbsencesInner{}
	return &this
}

// GetUserId returns the UserId field value if set, zero value otherwise.
func (o *ScanCompleteAbsencesInner) GetUserId() string {
	if o == nil || IsNil(o.UserId) {
		var ret string
		return ret
	}
	return *o.UserId
}

// GetUserIdOk returns a tuple with the UserId field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *ScanCompleteAbsencesInner) GetUserIdOk() (*string, bool) {
	if o == nil || IsNil(o.UserId) {
		return nil, false
	}
	return o.UserId, true
}

// HasUserId returns a boolean if a field has been set.
func (o *ScanCompleteAbsencesInner) HasUserId() bool {
	if o != nil && !IsNil(o.UserId) {
		return true
	}

	return false
}

// SetUserId gets a reference to the given string and assigns it to the UserId field.
func (o *ScanCompleteAbsencesInner) SetUserId(v string) {
	o.UserId = &v
}

// GetAbsence returns the Absence field value if set, zero value otherwise.
func (o *ScanCompleteAbsencesInner) GetAbsence() float32 {
	if o == nil || IsNil(o.Absence) {
		var ret float32
		return ret
	}
	return *o.Absence
}

// GetAbsenceOk returns a tuple with the Absence field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *ScanCompleteAbsencesInner) GetAbsenceOk() (*float32, bool) {
	if o == nil || IsNil(o.Absence) {
		return nil, false
	}
	return o.Absence, true
}

// HasAbsence returns a boolean if a field has been set.
func (o *ScanCompleteAbsencesInner) HasAbsence() bool {
	if o != nil && !IsNil(o.Absence) {
		return true
	}

	return false
}

// SetAbsence gets a reference to the given float32 and assigns it to the Absence field.
func (o *ScanCompleteAbsencesInner) SetAbsence(v float32) {
	o.Absence = &v
}

// GetDate returns the Date field value if set, zero value otherwise.
func (o *ScanCompleteAbsencesInner) GetDate() string {
	if o == nil || IsNil(o.Date) {
		var ret string
		return ret
	}
	return *o.Date
}

// GetDateOk returns a tuple with the Date field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *ScanCompleteAbsencesInner) GetDateOk() (*string, bool) {
	if o == nil || IsNil(o.Date) {
		return nil, false
	}
	return o.Date, true
}

// HasDate returns a boolean if a field has been set.
func (o *ScanCompleteAbsencesInner) HasDate() bool {
	if o != nil && !IsNil(o.Date) {
		return true
	}

	return false
}

// SetDate gets a reference to the given string and assigns it to the Date field.
func (o *ScanCompleteAbsencesInner) SetDate(v string) {
	o.Date = &v
}

func (o ScanCompleteAbsencesInner) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o ScanCompleteAbsencesInner) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if !IsNil(o.UserId) {
		toSerialize["user_id"] = o.UserId
	}
	if !IsNil(o.Absence) {
		toSerialize["absence"] = o.Absence
	}
	if !IsNil(o.Date) {
		toSerialize["date"] = o.Date
	}
	return toSerialize, nil
}

type NullableScanCompleteAbsencesInner struct {
	value *ScanCompleteAbsencesInner
	isSet bool
}

func (v NullableScanCompleteAbsencesInner) Get() *ScanCompleteAbsencesInner {
	return v.value
}

func (v *NullableScanCompleteAbsencesInner) Set(val *ScanCompleteAbsencesInner) {
	v.value = val
	v.isSet = true
}

func (v NullableScanCompleteAbsencesInner) IsSet() bool {
	return v.isSet
}

func (v *NullableScanCompleteAbsencesInner) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableScanCompleteAbsencesInner(val *ScanCompleteAbsencesInner) *NullableScanCompleteAbsencesInner {
	return &NullableScanCompleteAbsencesInner{value: val, isSet: true}
}

func (v NullableScanCompleteAbsencesInner) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableScanCompleteAbsencesInner) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


