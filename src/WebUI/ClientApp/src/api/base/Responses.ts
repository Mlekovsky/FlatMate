import { AxiosResponse, AxiosRequestConfig } from 'axios';

/** IRequest - interfejs podstawowej response z axios */
export interface IResponse<T> {
  /** Typ danych jakie mają zostać zwrócone z odpowiedzi */
  data: T;

  /** Http status kod np. 200, 300, 500, etc. */
  status: number;

  /** Http status wiadomość */
  statusText: string;

  /** Headery przesłane z serwera */
  headers: object;

  /** Config dla axiosa */
  config: AxiosRequestConfig;
}

/** Odpowiedź implementująca AxiosResponse dla typu danych T */
export class Response<T> implements AxiosResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;

  constructor(response: IResponse<T>) {
    this.data = response.data;
    this.status = response.status;
    this.statusText = response.statusText;
    this.headers = response.headers;
    this.config = response.config;
  }
}

/** Odpowiedź rozszerzająca Response dla typu danych Blob */
export class FileResponse extends Response<Blob> {}
