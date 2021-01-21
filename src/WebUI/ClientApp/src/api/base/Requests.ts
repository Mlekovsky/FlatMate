import { Method, ResponseType, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { PatchOperation } from './PatchOperation';

/** IRequest - interfejs podstawowego requestu do axios */
export interface IRequest {
  /** Adres endpointu do api */
  url: string;

  /** Search query parametry, czyli to co jest np.: ?iata=P */
  querySearchParams?: object | URLSearchParams;

  /** Metoda wysłania - domyślnie - GET */
  method?: Method;

  /** Nagłówki do przesłania, domyślnie nie są przesyłane żadne */
  headers?: object;

  /** Typ oczekiwanej odpowiedzi, domyślnie - json */
  responseType?: ResponseType;

  /** Body requestu */
  body?: any;

  /** Limit timeoutu dla requestu, domyślnie - 20000ms */
  timeout?: number;
}

/** IPatchRequest - interfejs podstawowego requestu typu PATCH */
export interface IPatchRequest extends IRequest {
  /** Typ operacji patch */
  operation: PatchOperation;

  /** Ścieżka */
  path: string;

  /** Wartość */
  value: any;
}

/**
 * Domyślne wartości:
 * @param {string} url - '/'
 * @param {Method} method - 'GET'
 * @param {ResponseType} responseType - 'json'
 * @param {any} headers - undefined
 * @param {any} data - undefined
 * @returns {Request} request,
 */
export class Request implements AxiosRequestConfig {
  url: string = '/';
  method: Method = 'GET';
  responseType: ResponseType = 'json';
  headers: any;
  data: any;
  params: any;
  paramsSerializer?: (params: any) => string;
  timeout: number = 20000;

  constructor(request: IRequest) {
    this.url = request.url;

    if (request.method) this.method = request.method;

    if (request.responseType) this.responseType = request.responseType;

    if (request.headers) this.headers = request.headers;

    if (request.body) this.data = request.body;

    if (request.querySearchParams) {
      this.params = request.querySearchParams;
      this.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'brackets' });
    }

    if (request.timeout) this.timeout = request.timeout;
  }
}

/**
 * Domyślne wartości:
 * @param {string} url - '/'
 * @param {Method} method - 'POST'
 * @param {ResponseType} responseType - 'json'
 * @param {any} headers - { 'Content-Type': 'application/json' }
 * @param {any} data - undefined
 * @returns {Request} request,
 */
export class PostRequest extends Request {
  method: Method = 'POST';
  responseType: ResponseType = 'json';
  headers: any = { 'Content-Type': 'application/json' };

  constructor(request: IRequest, additionalHeaders?: any) {
    super(request);

    this.headers = {
      ...this.headers,
      ...additionalHeaders,
    };
  }
}

/**
 * Domyślne wartości: - body jest budowane na JSONPatch
 * @param {string} url - '/'
 * @param {Method} method - 'PATCH'
 * @param {ResponseType} responseType - 'json'
 * @param {any} headers - { 'Content-Type': 'application/json-patch+json' }
 * @param {string} path - '/'
 * @param {PatchOperation} operation - 'test'
 * @param {any} value - null
 * @returns {Request} request,
 */
export class PatchRequest extends Request implements IPatchRequest {
  method: Method = 'PATCH';
  responseType: ResponseType = 'json';
  headers: any = { 'Content-Type': 'application/json-patch+json' };
  path: string = '/';
  operation: PatchOperation = PatchOperation.test;
  value: any = null;

  constructor(request: IPatchRequest) {
    super(request);

    this.operation = request.operation;
    this.path = request.path;
    this.value = request.value;
    request.body = JSON.stringify([
      {
        op: request.operation,
        path: request.path,
        value: request.value,
      },
    ]);

    this.data = request.body;
  }
}

/**
 * Domyślne wartości:
 * @param {string} url - '/'
 * @param {Method} method - 'PUT'
 * @param {ResponseType} responseType - 'json'
 * @param {any} headers - { 'Content-Type': 'application/json' }
 * @param {any} data - undefined
 * @returns {Request} request,
 */
export class PutRequest extends Request {
  method: Method = 'PUT';
  responseType: ResponseType = 'json';
  headers: any = { 'Content-Type': 'application/json' };
}

/**
 * Domyślne wartości:
 * @param {string} url - '/'
 * @param {Method} method - 'GET'
 * @param {ResponseType} responseType - 'blob'
 * @param {any} headers - undefined
 * @param {any} data - undefined
 * @returns {Request} request,
 */
export class DownloadFileRequest extends Request {
  responseType: ResponseType = 'blob';
}

/**
 * Domyślne wartości:
 * @param {string} url - '/'
 * @param {Method} method - 'POST'
 * @param {ResponseType} responseType - 'blob'
 * @param {any} headers - { 'Content-Type': 'multipart/form-data' }
 * @param {any} data - undefined
 * @returns {Request} request,
 */
export class UploadFileAndDownloadResultFileRequest extends Request {
  method: Method = 'POST';
  responseType: ResponseType = 'blob';
  headers: any = { 'Content-Type': 'multipart/form-data' };
}

/**
 * Domyślne wartości:
 * @param {string} url - '/'
 * @param {Method} method - 'DELETE'
 * @param {ResponseType} responseType - 'json'
 * @param {any} headers - { 'Content-Type': 'application/json' }
 * @param {any} data - undefined
 * @returns {Request} request,
 */
export class DeleteRequest extends Request {
  method: Method = 'DELETE';
  responseType: ResponseType = 'json';
  headers: any = { 'Content-Type': 'application/json' };
}
