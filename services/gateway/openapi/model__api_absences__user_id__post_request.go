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

// checks if the ApiAbsencesUserIdPostRequest type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &ApiAbsencesUserIdPostRequest{}

// ApiAbsencesUserIdPostRequest struct for ApiAbsencesUserIdPostRequest
type ApiAbsencesUserIdPostRequest struct {
	Lesson *float32 `json:"lesson,omitempty"`
	Date *string `json:"date,omitempty"`
}

// NewApiAbsencesUserIdPostRequest instantiates a new ApiAbsencesUserIdPostRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewApiAbsencesUserIdPostRequest() *ApiAbsencesUserIdPostRequest {
	this := ApiAbsencesUserIdPostRequest{}
	return &this
}

// NewApiAbsencesUserIdPostRequestWithDefaults instantiates a new ApiAbsencesUserIdPostRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewApiAbsencesUserIdPostRequestWithDefaults() *ApiAbsencesUserIdPostRequest {
	this := ApiAbsencesUserIdPostRequest{}
	return &this
}

// GetLesson returns the Lesson field value if set, zero value otherwise.
func (o *ApiAbsencesUserIdPostRequest) GetLesson() float32 {
	if o == nil || IsNil(o.Lesson) {
		var ret float32
		return ret
	}
	return *o.Lesson
}

// GetLessonOk returns a tuple with the Lesson field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *ApiAbsencesUserIdPostRequest) GetLessonOk() (*float32, bool) {
	if o == nil || IsNil(o.Lesson) {
		return nil, false
	}
	return o.Lesson, true
}

// HasLesson returns a boolean if a field has been set.
func (o *ApiAbsencesUserIdPostRequest) HasLesson() bool {
	if o != nil && !IsNil(o.Lesson) {
		return true
	}

	return false
}

// SetLesson gets a reference to the given float32 and assigns it to the Lesson field.
func (o *ApiAbsencesUserIdPostRequest) SetLesson(v float32) {
	o.Lesson = &v
}

// GetDate returns the Date field value if set, zero value otherwise.
func (o *ApiAbsencesUserIdPostRequest) GetDate() string {
	if o == nil || IsNil(o.Date) {
		var ret string
		return ret
	}
	return *o.Date
}

// GetDateOk returns a tuple with the Date field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *ApiAbsencesUserIdPostRequest) GetDateOk() (*string, bool) {
	if o == nil || IsNil(o.Date) {
		return nil, false
	}
	return o.Date, true
}

// HasDate returns a boolean if a field has been set.
func (o *ApiAbsencesUserIdPostRequest) HasDate() bool {
	if o != nil && !IsNil(o.Date) {
		return true
	}

	return false
}

// SetDate gets a reference to the given string and assigns it to the Date field.
func (o *ApiAbsencesUserIdPostRequest) SetDate(v string) {
	o.Date = &v
}

func (o ApiAbsencesUserIdPostRequest) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o ApiAbsencesUserIdPostRequest) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if !IsNil(o.Lesson) {
		toSerialize["lesson"] = o.Lesson
	}
	if !IsNil(o.Date) {
		toSerialize["date"] = o.Date
	}
	return toSerialize, nil
}

type NullableApiAbsencesUserIdPostRequest struct {
	value *ApiAbsencesUserIdPostRequest
	isSet bool
}

func (v NullableApiAbsencesUserIdPostRequest) Get() *ApiAbsencesUserIdPostRequest {
	return v.value
}

func (v *NullableApiAbsencesUserIdPostRequest) Set(val *ApiAbsencesUserIdPostRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableApiAbsencesUserIdPostRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableApiAbsencesUserIdPostRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableApiAbsencesUserIdPostRequest(val *ApiAbsencesUserIdPostRequest) *NullableApiAbsencesUserIdPostRequest {
	return &NullableApiAbsencesUserIdPostRequest{value: val, isSet: true}
}

func (v NullableApiAbsencesUserIdPostRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableApiAbsencesUserIdPostRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


