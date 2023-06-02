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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UsersPost400ResponseFieldErrors
 */
export interface UsersPost400ResponseFieldErrors {
    /**
     * 
     * @type {Array<string>}
     * @memberof UsersPost400ResponseFieldErrors
     */
    name?: Array<UsersPost400ResponseFieldErrorsNameEnum>;
}


/**
 * @export
 */
export const UsersPost400ResponseFieldErrorsNameEnum = {
    Required: 'required'
} as const;
export type UsersPost400ResponseFieldErrorsNameEnum = typeof UsersPost400ResponseFieldErrorsNameEnum[keyof typeof UsersPost400ResponseFieldErrorsNameEnum];


/**
 * Check if a given object implements the UsersPost400ResponseFieldErrors interface.
 */
export function instanceOfUsersPost400ResponseFieldErrors(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UsersPost400ResponseFieldErrorsFromJSON(json: any): UsersPost400ResponseFieldErrors {
    return UsersPost400ResponseFieldErrorsFromJSONTyped(json, false);
}

export function UsersPost400ResponseFieldErrorsFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsersPost400ResponseFieldErrors {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}

export function UsersPost400ResponseFieldErrorsToJSON(value?: UsersPost400ResponseFieldErrors | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
    };
}
