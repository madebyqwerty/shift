# Scan

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Img** | ***os.File** | The image of the absence table. (max 20mb) | 
**WeekNumber** | **int32** | The week number of the absence table. | 

## Methods

### NewScan

`func NewScan(img *os.File, weekNumber int32, ) *Scan`

NewScan instantiates a new Scan object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewScanWithDefaults

`func NewScanWithDefaults() *Scan`

NewScanWithDefaults instantiates a new Scan object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetImg

`func (o *Scan) GetImg() *os.File`

GetImg returns the Img field if non-nil, zero value otherwise.

### GetImgOk

`func (o *Scan) GetImgOk() (**os.File, bool)`

GetImgOk returns a tuple with the Img field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetImg

`func (o *Scan) SetImg(v *os.File)`

SetImg sets Img field to given value.


### GetWeekNumber

`func (o *Scan) GetWeekNumber() int32`

GetWeekNumber returns the WeekNumber field if non-nil, zero value otherwise.

### GetWeekNumberOk

`func (o *Scan) GetWeekNumberOk() (*int32, bool)`

GetWeekNumberOk returns a tuple with the WeekNumber field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWeekNumber

`func (o *Scan) SetWeekNumber(v int32)`

SetWeekNumber sets WeekNumber field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


