# Absence

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Name** | **string** | The user&#39;s name | 
**UserId** | **string** | The user&#39;s id | 
**Id** | **string** | The absence&#39;s id. | 
**Lesson** | **float32** | The lesson number | 
**Date** | **string** | Date of the absence | 

## Methods

### NewAbsence

`func NewAbsence(name string, userId string, id string, lesson float32, date string, ) *Absence`

NewAbsence instantiates a new Absence object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAbsenceWithDefaults

`func NewAbsenceWithDefaults() *Absence`

NewAbsenceWithDefaults instantiates a new Absence object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetName

`func (o *Absence) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *Absence) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *Absence) SetName(v string)`

SetName sets Name field to given value.


### GetUserId

`func (o *Absence) GetUserId() string`

GetUserId returns the UserId field if non-nil, zero value otherwise.

### GetUserIdOk

`func (o *Absence) GetUserIdOk() (*string, bool)`

GetUserIdOk returns a tuple with the UserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserId

`func (o *Absence) SetUserId(v string)`

SetUserId sets UserId field to given value.


### GetId

`func (o *Absence) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Absence) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Absence) SetId(v string)`

SetId sets Id field to given value.


### GetLesson

`func (o *Absence) GetLesson() float32`

GetLesson returns the Lesson field if non-nil, zero value otherwise.

### GetLessonOk

`func (o *Absence) GetLessonOk() (*float32, bool)`

GetLessonOk returns a tuple with the Lesson field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLesson

`func (o *Absence) SetLesson(v float32)`

SetLesson sets Lesson field to given value.


### GetDate

`func (o *Absence) GetDate() string`

GetDate returns the Date field if non-nil, zero value otherwise.

### GetDateOk

`func (o *Absence) GetDateOk() (*string, bool)`

GetDateOk returns a tuple with the Date field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDate

`func (o *Absence) SetDate(v string)`

SetDate sets Date field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


