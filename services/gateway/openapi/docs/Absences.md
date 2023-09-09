# Absences

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** | When the user has more than one hour of absence, every hour of his absence will be in this array with a user_id. | [optional] 
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

### GetId

`func (o *Absences) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Absences) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Absences) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *Absences) HasId() bool`

HasId returns a boolean if a field has been set.

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


