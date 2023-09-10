# Absences

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**UserId** | Pointer to **string** | When the user has more than one hour of absence, every hour of his absence will be in this array with a user_id. | [optional] 
**AbsenceId** | Pointer to **string** | The id of the absence. | [optional] 
**Name** | Pointer to **string** | The name of the user. | [optional] 
**Absence** | Pointer to **float32** | Only one hour of absence, if he has another hour it will be in another item in this list. | [optional] 
**Date** | Pointer to **string** | The date of the absence. | [optional] 

## Methods

### NewAbsences

`func NewAbsences() *Absences`

NewAbsences instantiates a new Absences object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAbsencesWithDefaults

`func NewAbsencesWithDefaults() *Absences`

NewAbsencesWithDefaults instantiates a new Absences object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUserId

`func (o *Absences) GetUserId() string`

GetUserId returns the UserId field if non-nil, zero value otherwise.

### GetUserIdOk

`func (o *Absences) GetUserIdOk() (*string, bool)`

GetUserIdOk returns a tuple with the UserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserId

`func (o *Absences) SetUserId(v string)`

SetUserId sets UserId field to given value.

### HasUserId

`func (o *Absences) HasUserId() bool`

HasUserId returns a boolean if a field has been set.

### GetAbsenceId

`func (o *Absences) GetAbsenceId() string`

GetAbsenceId returns the AbsenceId field if non-nil, zero value otherwise.

### GetAbsenceIdOk

`func (o *Absences) GetAbsenceIdOk() (*string, bool)`

GetAbsenceIdOk returns a tuple with the AbsenceId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAbsenceId

`func (o *Absences) SetAbsenceId(v string)`

SetAbsenceId sets AbsenceId field to given value.

### HasAbsenceId

`func (o *Absences) HasAbsenceId() bool`

HasAbsenceId returns a boolean if a field has been set.

### GetName

`func (o *Absences) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *Absences) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *Absences) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *Absences) HasName() bool`

HasName returns a boolean if a field has been set.

### GetAbsence

`func (o *Absences) GetAbsence() float32`

GetAbsence returns the Absence field if non-nil, zero value otherwise.

### GetAbsenceOk

`func (o *Absences) GetAbsenceOk() (*float32, bool)`

GetAbsenceOk returns a tuple with the Absence field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAbsence

`func (o *Absences) SetAbsence(v float32)`

SetAbsence sets Absence field to given value.

### HasAbsence

`func (o *Absences) HasAbsence() bool`

HasAbsence returns a boolean if a field has been set.

### GetDate

`func (o *Absences) GetDate() string`

GetDate returns the Date field if non-nil, zero value otherwise.

### GetDateOk

`func (o *Absences) GetDateOk() (*string, bool)`

GetDateOk returns a tuple with the Date field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDate

`func (o *Absences) SetDate(v string)`

SetDate sets Date field to given value.

### HasDate

`func (o *Absences) HasDate() bool`

HasDate returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


