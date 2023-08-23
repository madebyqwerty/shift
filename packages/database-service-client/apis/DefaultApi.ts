/* tslint:disable */
/* eslint-disable */
/**
 * Database service API
 * REST API for interacting with the database service.
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Absence,
  ApiAbsencesUserIdPost200Response,
  ApiAbsencesUserIdPostRequest,
  ApiUsersPostRequest,
  ScanPost200Response,
  User,
} from '../models/index';
import {
    AbsenceFromJSON,
    AbsenceToJSON,
    ApiAbsencesUserIdPost200ResponseFromJSON,
    ApiAbsencesUserIdPost200ResponseToJSON,
    ApiAbsencesUserIdPostRequestFromJSON,
    ApiAbsencesUserIdPostRequestToJSON,
    ApiUsersPostRequestFromJSON,
    ApiUsersPostRequestToJSON,
    ScanPost200ResponseFromJSON,
    ScanPost200ResponseToJSON,
    UserFromJSON,
    UserToJSON,
} from '../models/index';

export interface ApiAbsencesUserIdGetRequest {
    userId: string;
}

export interface ApiAbsencesUserIdPostOperationRequest {
    userId: string;
    apiAbsencesUserIdPostRequest: ApiAbsencesUserIdPostRequest;
}

export interface ApiUsersPostOperationRequest {
    apiUsersPostRequest: ApiUsersPostRequest;
}

export interface ApiUsersUserIdGetRequest {
    userId: string;
}

export interface ScanPostRequest {
    img: Blob;
    weekNumber: number;
}

export interface WsScanUserIdGetRequest {
    userId: string;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * List of all absences for a user
     */
    async apiAbsencesUserIdGetRaw(requestParameters: ApiAbsencesUserIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Absence>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling apiAbsencesUserIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/absences/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AbsenceFromJSON));
    }

    /**
     * List of all absences for a user
     */
    async apiAbsencesUserIdGet(requestParameters: ApiAbsencesUserIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Absence>> {
        const response = await this.apiAbsencesUserIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates a new absence.
     */
    async apiAbsencesUserIdPostRaw(requestParameters: ApiAbsencesUserIdPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiAbsencesUserIdPost200Response>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling apiAbsencesUserIdPost.');
        }

        if (requestParameters.apiAbsencesUserIdPostRequest === null || requestParameters.apiAbsencesUserIdPostRequest === undefined) {
            throw new runtime.RequiredError('apiAbsencesUserIdPostRequest','Required parameter requestParameters.apiAbsencesUserIdPostRequest was null or undefined when calling apiAbsencesUserIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/absences/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ApiAbsencesUserIdPostRequestToJSON(requestParameters.apiAbsencesUserIdPostRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiAbsencesUserIdPost200ResponseFromJSON(jsonValue));
    }

    /**
     * Creates a new absence.
     */
    async apiAbsencesUserIdPost(requestParameters: ApiAbsencesUserIdPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiAbsencesUserIdPost200Response> {
        const response = await this.apiAbsencesUserIdPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List of all users
     */
    async apiUsersGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<User>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserFromJSON));
    }

    /**
     * List of all users
     */
    async apiUsersGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<User>> {
        const response = await this.apiUsersGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates a new user.
     */
    async apiUsersPostRaw(requestParameters: ApiUsersPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.apiUsersPostRequest === null || requestParameters.apiUsersPostRequest === undefined) {
            throw new runtime.RequiredError('apiUsersPostRequest','Required parameter requestParameters.apiUsersPostRequest was null or undefined when calling apiUsersPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ApiUsersPostRequestToJSON(requestParameters.apiUsersPostRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * Creates a new user.
     */
    async apiUsersPost(requestParameters: ApiUsersPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.apiUsersPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * A user with the given ID
     */
    async apiUsersUserIdGetRaw(requestParameters: ApiUsersUserIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling apiUsersUserIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/users/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * A user with the given ID
     */
    async apiUsersUserIdGet(requestParameters: ApiUsersUserIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.apiUsersUserIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Scan absence table
     */
    async scanPostRaw(requestParameters: ScanPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ScanPost200Response>> {
        if (requestParameters.img === null || requestParameters.img === undefined) {
            throw new runtime.RequiredError('img','Required parameter requestParameters.img was null or undefined when calling scanPost.');
        }

        if (requestParameters.weekNumber === null || requestParameters.weekNumber === undefined) {
            throw new runtime.RequiredError('weekNumber','Required parameter requestParameters.weekNumber was null or undefined when calling scanPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/formdata' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.img !== undefined) {
            formParams.append('img', requestParameters.img as any);
        }

        if (requestParameters.weekNumber !== undefined) {
            formParams.append('week_number', requestParameters.weekNumber as any);
        }

        const response = await this.request({
            path: `/scan`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ScanPost200ResponseFromJSON(jsonValue));
    }

    /**
     * Scan absence table
     */
    async scanPost(requestParameters: ScanPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ScanPost200Response> {
        const response = await this.scanPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Connect to websocket (will fail with 101 if not a websocket)
     */
    async wsScanUserIdGetRaw(requestParameters: WsScanUserIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling wsScanUserIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/ws/scan/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Connect to websocket (will fail with 101 if not a websocket)
     */
    async wsScanUserIdGet(requestParameters: WsScanUserIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.wsScanUserIdGetRaw(requestParameters, initOverrides);
    }

}
