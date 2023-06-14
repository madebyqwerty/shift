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
 * @interface AbsencesUserIdGetDefaultResponseErrors
 */
export interface AbsencesUserIdGetDefaultResponseErrors {
    /**
     * 
     * @type {Array<string>}
     * @memberof AbsencesUserIdGetDefaultResponseErrors
     */
    example?: Array<string>;
}

/**
 * Check if a given object implements the AbsencesUserIdGetDefaultResponseErrors interface.
 */
export function instanceOfAbsencesUserIdGetDefaultResponseErrors(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AbsencesUserIdGetDefaultResponseErrorsFromJSON(json: any): AbsencesUserIdGetDefaultResponseErrors {
    return AbsencesUserIdGetDefaultResponseErrorsFromJSONTyped(json, false);
}

export function AbsencesUserIdGetDefaultResponseErrorsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AbsencesUserIdGetDefaultResponseErrors {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'example': !exists(json, 'example') ? undefined : json['example'],
    };
}

export function AbsencesUserIdGetDefaultResponseErrorsToJSON(value?: AbsencesUserIdGetDefaultResponseErrors | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'example': value.example,
    };
}

