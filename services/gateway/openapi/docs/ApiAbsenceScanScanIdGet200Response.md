# ApiAbsenceScanScanIdGet200Response

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** | The id of the absence scan. | [optional] 
**Absences** | Pointer to [**[]Absences**](Absences.md) |  | [optional] 

## Methods

### NewApiAbsenceScanScanIdGet200Response

`func NewApiAbsenceScanScanIdGet200Response() *ApiAbsenceScanScanIdGet200Response`

NewApiAbsenceScanScanIdGet200Response instantiates a new ApiAbsenceScanScanIdGet200Response object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewApiAbsenceScanScanIdGet200ResponseWithDefaults

`func NewApiAbsenceScanScanIdGet200ResponseWithDefaults() *ApiAbsenceScanScanIdGet200Response`

NewApiAbsenceScanScanIdGet200ResponseWithDefaults instantiates a new ApiAbsenceScanScanIdGet200Response object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *ApiAbsenceScanScanIdGet200Response) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *ApiAbsenceScanScanIdGet200Response) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *ApiAbsenceScanScanIdGet200Response) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *ApiAbsenceScanScanIdGet200Response) HasId() bool`

HasId returns a boolean if a field has been set.

### GetAbsences

`func (o *ApiAbsenceScanScanIdGet200Response) GetAbsences() []Absences`

GetAbsences returns the Absences field if non-nil, zero value otherwise.

### GetAbsencesOk

`func (o *ApiAbsenceScanScanIdGet200Response) GetAbsencesOk() (*[]Absences, bool)`

GetAbsencesOk returns a tuple with the Absences field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAbsences

`func (o *ApiAbsenceScanScanIdGet200Response) SetAbsences(v []Absences)`

SetAbsences sets Absences field to given value.

### HasAbsences

`func (o *ApiAbsenceScanScanIdGet200Response) HasAbsences() bool`

HasAbsences returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


