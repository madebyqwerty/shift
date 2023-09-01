# \DefaultAPI

All URIs are relative to *http://localhost:5003*

Method | HTTP request | Description
------------- | ------------- | -------------
[**ApiAbsencesUserIdGet**](DefaultAPI.md#ApiAbsencesUserIdGet) | **Get** /api/absences/{user_id} | List of all absences for a user
[**ApiAbsencesUserIdPost**](DefaultAPI.md#ApiAbsencesUserIdPost) | **Post** /api/absences/{user_id} | Creates a new absence.
[**ApiUsersGet**](DefaultAPI.md#ApiUsersGet) | **Get** /api/users | List of all users
[**ApiUsersPost**](DefaultAPI.md#ApiUsersPost) | **Post** /api/users | Creates a new user.
[**ApiUsersUserIdGet**](DefaultAPI.md#ApiUsersUserIdGet) | **Get** /api/users/{user_id} | A user with the given ID
[**ScanCompleteScanIdPost**](DefaultAPI.md#ScanCompleteScanIdPost) | **Post** /scan/complete/{scan_id} | Complete a scan
[**ScanPost**](DefaultAPI.md#ScanPost) | **Post** /scan | Scan absence table
[**WsScanUserIdGet**](DefaultAPI.md#WsScanUserIdGet) | **Get** /ws/scan/{user_id} | Connect to websocket (will fail with 101 if not a websocket)



## ApiAbsencesUserIdGet

> []Absence ApiAbsencesUserIdGet(ctx, userId).Execute()

List of all absences for a user

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    userId := "userId_example" // string | ID of the user to get

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DefaultAPI.ApiAbsencesUserIdGet(context.Background(), userId).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DefaultAPI.ApiAbsencesUserIdGet``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `ApiAbsencesUserIdGet`: []Absence
    fmt.Fprintf(os.Stdout, "Response from `DefaultAPI.ApiAbsencesUserIdGet`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | ID of the user to get | 

### Other Parameters

Other parameters are passed through a pointer to a apiApiAbsencesUserIdGetRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**[]Absence**](Absence.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ApiAbsencesUserIdPost

> ApiAbsencesUserIdPost200Response ApiAbsencesUserIdPost(ctx, userId).ApiAbsencesUserIdPostRequest(apiAbsencesUserIdPostRequest).Execute()

Creates a new absence.

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    userId := "userId_example" // string | ID of the user to get
    apiAbsencesUserIdPostRequest := *openapiclient.NewApiAbsencesUserIdPostRequest() // ApiAbsencesUserIdPostRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DefaultAPI.ApiAbsencesUserIdPost(context.Background(), userId).ApiAbsencesUserIdPostRequest(apiAbsencesUserIdPostRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DefaultAPI.ApiAbsencesUserIdPost``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `ApiAbsencesUserIdPost`: ApiAbsencesUserIdPost200Response
    fmt.Fprintf(os.Stdout, "Response from `DefaultAPI.ApiAbsencesUserIdPost`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | ID of the user to get | 

### Other Parameters

Other parameters are passed through a pointer to a apiApiAbsencesUserIdPostRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **apiAbsencesUserIdPostRequest** | [**ApiAbsencesUserIdPostRequest**](ApiAbsencesUserIdPostRequest.md) |  | 

### Return type

[**ApiAbsencesUserIdPost200Response**](ApiAbsencesUserIdPost200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ApiUsersGet

> []User ApiUsersGet(ctx).Execute()

List of all users

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DefaultAPI.ApiUsersGet(context.Background()).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DefaultAPI.ApiUsersGet``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `ApiUsersGet`: []User
    fmt.Fprintf(os.Stdout, "Response from `DefaultAPI.ApiUsersGet`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiApiUsersGetRequest struct via the builder pattern


### Return type

[**[]User**](User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ApiUsersPost

> User ApiUsersPost(ctx).ApiUsersPostRequest(apiUsersPostRequest).Execute()

Creates a new user.

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    apiUsersPostRequest := *openapiclient.NewApiUsersPostRequest() // ApiUsersPostRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DefaultAPI.ApiUsersPost(context.Background()).ApiUsersPostRequest(apiUsersPostRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DefaultAPI.ApiUsersPost``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `ApiUsersPost`: User
    fmt.Fprintf(os.Stdout, "Response from `DefaultAPI.ApiUsersPost`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiApiUsersPostRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **apiUsersPostRequest** | [**ApiUsersPostRequest**](ApiUsersPostRequest.md) |  | 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ApiUsersUserIdGet

> User ApiUsersUserIdGet(ctx, userId).Execute()

A user with the given ID

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    userId := "userId_example" // string | ID of the user

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DefaultAPI.ApiUsersUserIdGet(context.Background(), userId).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DefaultAPI.ApiUsersUserIdGet``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `ApiUsersUserIdGet`: User
    fmt.Fprintf(os.Stdout, "Response from `DefaultAPI.ApiUsersUserIdGet`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | ID of the user | 

### Other Parameters

Other parameters are passed through a pointer to a apiApiUsersUserIdGetRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ScanCompleteScanIdPost

> ScanCompleteScanIdPost(ctx, scanId).ScanCompleteInner(scanCompleteInner).Execute()

Complete a scan

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    scanId := "scanId_example" // string | ID of the scan
    scanCompleteInner := []openapiclient.ScanCompleteInner{*openapiclient.NewScanCompleteInner()} // []ScanCompleteInner | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    r, err := apiClient.DefaultAPI.ScanCompleteScanIdPost(context.Background(), scanId).ScanCompleteInner(scanCompleteInner).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DefaultAPI.ScanCompleteScanIdPost``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**scanId** | **string** | ID of the scan | 

### Other Parameters

Other parameters are passed through a pointer to a apiScanCompleteScanIdPostRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **scanCompleteInner** | [**[]ScanCompleteInner**](ScanCompleteInner.md) |  | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ScanPost

> ScanPost200Response ScanPost(ctx).Img(img).WeekNumber(weekNumber).Execute()

Scan absence table

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    img := os.NewFile(1234, "some_file") // *os.File | The image of the absence table. (max 20mb)
    weekNumber := int32(56) // int32 | The week number of the absence table.

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DefaultAPI.ScanPost(context.Background()).Img(img).WeekNumber(weekNumber).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DefaultAPI.ScanPost``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `ScanPost`: ScanPost200Response
    fmt.Fprintf(os.Stdout, "Response from `DefaultAPI.ScanPost`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiScanPostRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **img** | ***os.File** | The image of the absence table. (max 20mb) | 
 **weekNumber** | **int32** | The week number of the absence table. | 

### Return type

[**ScanPost200Response**](ScanPost200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/formdata
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## WsScanUserIdGet

> WsScanUserIdGet(ctx, userId).Execute()

Connect to websocket (will fail with 101 if not a websocket)

### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    userId := "userId_example" // string | ID of the user

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    r, err := apiClient.DefaultAPI.WsScanUserIdGet(context.Background(), userId).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DefaultAPI.WsScanUserIdGet``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | ID of the user | 

### Other Parameters

Other parameters are passed through a pointer to a apiWsScanUserIdGetRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

