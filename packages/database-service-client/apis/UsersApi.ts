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
  User,
  UsersGet400Response,
  UsersIdGet400Response,
  UsersIdGet404Response,
  UsersPost400Response,
  UsersPostRequest,
} from '../models';
import {
    UserFromJSON,
    UserToJSON,
    UsersGet400ResponseFromJSON,
    UsersGet400ResponseToJSON,
    UsersIdGet400ResponseFromJSON,
    UsersIdGet400ResponseToJSON,
    UsersIdGet404ResponseFromJSON,
    UsersIdGet404ResponseToJSON,
    UsersPost400ResponseFromJSON,
    UsersPost400ResponseToJSON,
    UsersPostRequestFromJSON,
    UsersPostRequestToJSON,
} from '../models';

export interface UsersIdGetRequest {
    id: string;
}

export interface UsersPostOperationRequest {
    usersPostRequest: UsersPostRequest;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * List of all users
     */
    async usersGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<User>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserFromJSON));
    }

    /**
     * List of all users
     */
    async usersGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<User>> {
        const response = await this.usersGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Returns a user by ID.
     */
    async usersIdGetRaw(requestParameters: UsersIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling usersIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * Returns a user by ID.
     */
    async usersIdGet(requestParameters: UsersIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.usersIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Creates a new user.
     */
    async usersPostRaw(requestParameters: UsersPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.usersPostRequest === null || requestParameters.usersPostRequest === undefined) {
            throw new runtime.RequiredError('usersPostRequest','Required parameter requestParameters.usersPostRequest was null or undefined when calling usersPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UsersPostRequestToJSON(requestParameters.usersPostRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * Creates a new user.
     */
    async usersPost(requestParameters: UsersPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.usersPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}