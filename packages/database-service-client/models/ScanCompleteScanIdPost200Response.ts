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
import type { Status } from './Status';
import {
    StatusFromJSON,
    StatusFromJSONTyped,
    StatusToJSON,
} from './Status';

/**
 * 
 * @export
 * @interface ScanCompleteScanIdPost200Response
 */
export interface ScanCompleteScanIdPost200Response {
    /**
     * 
     * @type {Status}
     * @memberof ScanCompleteScanIdPost200Response
     */
    status?: Status;
    /**
     * 
     * @type {string}
     * @memberof ScanCompleteScanIdPost200Response
     */
    message?: string;
}

/**
 * Check if a given object implements the ScanCompleteScanIdPost200Response interface.
 */
export function instanceOfScanCompleteScanIdPost200Response(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ScanCompleteScanIdPost200ResponseFromJSON(json: any): ScanCompleteScanIdPost200Response {
    return ScanCompleteScanIdPost200ResponseFromJSONTyped(json, false);
}

export function ScanCompleteScanIdPost200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ScanCompleteScanIdPost200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': !exists(json, 'status') ? undefined : StatusFromJSON(json['status']),
        'message': !exists(json, 'message') ? undefined : json['message'],
    };
}

export function ScanCompleteScanIdPost200ResponseToJSON(value?: ScanCompleteScanIdPost200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': StatusToJSON(value.status),
        'message': value.message,
    };
}

