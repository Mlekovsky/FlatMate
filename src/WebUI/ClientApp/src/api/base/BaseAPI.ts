import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { config } from './RequestConfig';
import {
  DownloadFileRequest,
  UploadFileAndDownloadResultFileRequest,
  PostRequest,
  Request,
  DeleteRequest,
  PatchRequest,
  PutRequest,
} from './Requests';
import { FileResponse, Response } from './Responses';

export abstract class BaseAPI {
  private _api: AxiosInstance;
  private _config: AxiosRequestConfig;

  public constructor() {
    this._config = config;
    this._api = axios.create(this._config);
    this._api.interceptors.request.use((param: AxiosRequestConfig) => ({
      ...param,
    }));
  }

  /**
   * get<T> - funkcja wysyła żądanie GET na serwer
   * @param {Request} request - żądanie na serwer
   * @param {onSuccess?} onSuccess - callback po poprawnym odebraniu odpowiedzi z serwera
   * @returns {Promise<Response<T>>} - promise z odpowiedzią i danymi typu T
   */
  protected async get<T>(request: Request, onSuccess?: (response: Response<T>) => void): Promise<Response<T>> {
    return this.request<T>(request, onSuccess);
  }

  /**
   * post<T> - funkcja wysyła żądanie POST na serwer
   * @param {PostRequest} request - żądanie na serwer
   * @param {onSuccess?} onSuccess - callback po poprawnym odebraniu odpowiedzi z serwera
   * @returns {Promise<Response<T>>} - promise z odpowiedzią i danymi typu T
   */
  protected async post<T>(request: PostRequest, onSuccess?: (response: Response<T>) => void): Promise<Response<T>> {
    return this.request<T>(request, onSuccess);
  }

  /**
   * put<T> - funkcja wysyła żądanie PUT na serwer
   * @param {PutRequest} request - żądanie na serwer
   * @param {onSuccess?} onSuccess - callback po poprawnym odebraniu odpowiedzi z serwera
   * @returns {Promise<Response<T>>} - promise z odpowiedzią i danymi typu T
   */
  protected async put<T>(request: PutRequest, onSuccess?: (response: Response<T>) => void): Promise<Response<T>> {
    return this.request<T>(request, onSuccess);
  }

  /**
   * delete<T> - funkcja wysyła żądanie DELETE na serwer
   * @param {DeleteRequest} request - żądanie na serwer
   * @param {onSuccess?} onSuccess - callback po poprawnym odebraniu odpowiedzi z serwera
   * @returns {Promise<Response<T>>} - promise z odpowiedzią i danymi typu T
   */
  protected async delete<T>(request: DeleteRequest, onSuccess?: (response: Response<T>) => void): Promise<Response<T>> {
    return this.request<T>(request, onSuccess);
  }

  /**
   * patch<T> - funkcja wysyła żądanie PATCH na serwer
   * @param {PostRequest} request - żądanie na serwer
   * @param {onSuccess?} onSuccess - callback po poprawnym odebraniu odpowiedzi z serwera
   * @returns {Promise<Response<T>>} - promise z odpowiedzią i danymi typu T
   */
  protected async patch<T>(request: PatchRequest, onSuccess?: (response: Response<T>) => void): Promise<Response<T>> {
    return this.request<T>(request, onSuccess);
  }

  /**
   * downloadFile - funkcja wysyła żądanie na serwer o plik
   * @param {DownloadFileRequest} request - żądanie na serwer
   * @param {onSuccess?} onSuccess - callback po poprawnym odebraniu odpowiedzi z serwera
   * @returns {Promise<FileResponse>} - promise z odpowiedzią i plikiem
   */
  protected async downloadFile(
    request: DownloadFileRequest,
    onSuccess?: (response: FileResponse) => void,
  ): Promise<FileResponse> {
    return this.request<Blob>(request, onSuccess);
  }

  /**
   * uploadFileAndDownloadResultFile - funkcja wysyła na serwer plik, a następnie odbiera plik z wynikiem
   * @param {UploadFileAndDownloadResultFileRequest} request - żądanie na serwer
   * @param {onSuccess?} onSuccess - callback po poprawnym odebraniu odpowiedzi z serwera
   * @returns {Promise<FileResponse>} - promise z odpowiedzią i plikiem
   */
  protected async uploadFileAndDownloadResultFile(
    request: UploadFileAndDownloadResultFileRequest,
    onSuccess?: (response: FileResponse) => void,
  ): Promise<FileResponse> {
    return this.request<Blob>(request, onSuccess);
  }

  /**
   * request<T> - funkcja wysyła żądanie zawarte w klasie typu Request na serwer
   * @param {Request} request - żądanie na serwer
   * @param {onSuccess?} onSuccess - callback po poprawnym odebraniu odpowiedzi z serwera
   * @returns {Promise<Response<T>>} - promise z odpowiedzią i danymi typu T
   */
  private async request<T>(request: Request, onSuccess?: (response: Response<T>) => void): Promise<Response<T>> {
    let resultResponse = await this._api
      .request<T>(request)
      .then(
        (response: AxiosResponse<T>) =>
          new Response<T>({
            config: request,
            data: response.data,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
          }),
      )
      .catch(
        (axiosError: AxiosError<Response<T>>) =>
          new Response<T>({
            config: axiosError.config,
            data: axiosError.response?.data?.data as T,
            headers: axiosError.response?.headers,
            status: axiosError.response?.status ?? 0,
            statusText: axiosError.response?.statusText ?? '',
          }),
      );

    if (this.isResponseSuccessful(resultResponse.status)) {
      if (onSuccess) onSuccess(resultResponse);

      return Promise.resolve(resultResponse);
    }

    return Promise.reject(resultResponse);
  }

  /**
   * isResponseSuccessful - funkcja sprawdza, czy kod odpowiedzi jest poprawny
   * @param {number} status - number kodu odpowiedzi HTTP
   * @returns {boolean} - poprawność kodu odpowiedzi HTTP
   */
  protected isResponseSuccessful(status: number): boolean {
    return status >= 200 && status < 400;
  }
}
