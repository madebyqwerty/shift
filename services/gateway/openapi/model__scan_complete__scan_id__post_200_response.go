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

// checks if the ScanCompleteScanIdPost200Response type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &ScanCompleteScanIdPost200Response{}

// ScanCompleteScanIdPost200Response struct for ScanCompleteScanIdPost200Response
type ScanCompleteScanIdPost200Response struct {
	Status *Status `json:"status,omitempty"`
	Message *string `json:"message,omitempty"`
}

// NewScanCompleteScanIdPost200Response instantiates a new ScanCompleteScanIdPost200Response object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewScanCompleteScanIdPost200Response() *ScanCompleteScanIdPost200Response {
	this := ScanCompleteScanIdPost200Response{}
	return &this
}

// NewScanCompleteScanIdPost200ResponseWithDefaults instantiates a new ScanCompleteScanIdPost200Response object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewScanCompleteScanIdPost200ResponseWithDefaults() *ScanCompleteScanIdPost200Response {
	this := ScanCompleteScanIdPost200Response{}
	return &this
}

// GetStatus returns the Status field value if set, zero value otherwise.
func (o *ScanCompleteScanIdPost200Response) GetStatus() Status {
	if o == nil || IsNil(o.Status) {
		var ret Status
		return ret
	}
	return *o.Status
}

// GetStatusOk returns a tuple with the Status field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *ScanCompleteScanIdPost200Response) GetStatusOk() (*Status, bool) {
	if o == nil || IsNil(o.Status) {
		return nil, false
	}
	return o.Status, true
}

// HasStatus returns a boolean if a field has been set.
func (o *ScanCompleteScanIdPost200Response) HasStatus() bool {
	if o != nil && !IsNil(o.Status) {
		return true
	}

	return false
}

// SetStatus gets a reference to the given Status and assigns it to the Status field.
func (o *ScanCompleteScanIdPost200Response) SetStatus(v Status) {
	o.Status = &v
}

// GetMessage returns the Message field value if set, zero value otherwise.
func (o *ScanCompleteScanIdPost200Response) GetMessage() string {
	if o == nil || IsNil(o.Message) {
		var ret string
		return ret
	}
	return *o.Message
}

// GetMessageOk returns a tuple with the Message field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *ScanCompleteScanIdPost200Response) GetMessageOk() (*string, bool) {
	if o == nil || IsNil(o.Message) {
		return nil, false
	}
	return o.Message, true
}

// HasMessage returns a boolean if a field has been set.
func (o *ScanCompleteScanIdPost200Response) HasMessage() bool {
	if o != nil && !IsNil(o.Message) {
		return true
	}

	return false
}

// SetMessage gets a reference to the given string and assigns it to the Message field.
func (o *ScanCompleteScanIdPost200Response) SetMessage(v string) {
	o.Message = &v
}

func (o ScanCompleteScanIdPost200Response) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o ScanCompleteScanIdPost200Response) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if !IsNil(o.Status) {
		toSerialize["status"] = o.Status
	}
	if !IsNil(o.Message) {
		toSerialize["message"] = o.Message
	}
	return toSerialize, nil
}

type NullableScanCompleteScanIdPost200Response struct {
	value *ScanCompleteScanIdPost200Response
	isSet bool
}

func (v NullableScanCompleteScanIdPost200Response) Get() *ScanCompleteScanIdPost200Response {
	return v.value
}

func (v *NullableScanCompleteScanIdPost200Response) Set(val *ScanCompleteScanIdPost200Response) {
	v.value = val
	v.isSet = true
}

func (v NullableScanCompleteScanIdPost200Response) IsSet() bool {
	return v.isSet
}

func (v *NullableScanCompleteScanIdPost200Response) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableScanCompleteScanIdPost200Response(val *ScanCompleteScanIdPost200Response) *NullableScanCompleteScanIdPost200Response {
	return &NullableScanCompleteScanIdPost200Response{value: val, isSet: true}
}

func (v NullableScanCompleteScanIdPost200Response) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableScanCompleteScanIdPost200Response) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


