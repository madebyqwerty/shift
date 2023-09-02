# ScanCompleteAbsencesInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**UserId** | Pointer to **string** | When the user has more than one hour of absence, every hour of his absence will be in this array with a user_id. | [optional] 
**Absence** | Pointer to **float32** | Only one hour of absence, if he has another hour it will be in another item in this list. | [optional] 
**Date** | Pointer to **string** | The date of the absence. | [optional] 

## Methods

### NewScanCompleteAbsencesInner

`func NewScanCompleteAbsencesInner() *ScanCompleteAbsencesInner`

NewScanCompleteAbsencesInner instantiates a new ScanCompleteAbsencesInner object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewScanCompleteAbsencesInnerWithDefaults

`func NewScanCompleteAbsencesInnerWithDefaults() *ScanCompleteAbsencesInner`

NewScanCompleteAbsencesInnerWithDefaults instantiates a new ScanCompleteAbsencesInner object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUserId

`func (o *ScanCompleteAbsencesInner) GetUserId() string`

GetUserId returns the UserId field if non-nil, zero value otherwise.

### GetUserIdOk

`func (o *ScanCompleteAbsencesInner) GetUserIdOk() (*string, bool)`

GetUserIdOk returns a tuple with the UserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserId

`func (o *ScanCompleteAbsencesInner) SetUserId(v string)`

SetUserId sets UserId field to given value.

### HasUserId

`func (o *ScanCompleteAbsencesInner) HasUserId() bool`

HasUserId returns a boolean if a field has been set.

### GetAbsence

`func (o *ScanCompleteAbsencesInner) GetAbsence() float32`

GetAbsence returns the Absence field if non-nil, zero value otherwise.

### GetAbsenceOk

`func (o *ScanCompleteAbsencesInner) GetAbsenceOk() (*float32, bool)`

GetAbsenceOk returns a tuple with the Absence field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAbsence

`func (o *ScanCompleteAbsencesInner) SetAbsence(v float32)`

SetAbsence sets Absence field to given value.

### HasAbsence

`func (o *ScanCompleteAbsencesInner) HasAbsence() bool`

HasAbsence returns a boolean if a field has been set.

### GetDate

`func (o *ScanCompleteAbsencesInner) GetDate() string`

GetDate returns the Date field if non-nil, zero value otherwise.

### GetDateOk

`func (o *ScanCompleteAbsencesInner) GetDateOk() (*string, bool)`

GetDateOk returns a tuple with the Date field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDate

`func (o *ScanCompleteAbsencesInner) SetDate(v string)`

SetDate sets Date field to given value.

### HasDate

`func (o *ScanCompleteAbsencesInner) HasDate() bool`

HasDate returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


