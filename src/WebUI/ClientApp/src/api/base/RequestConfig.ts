import axios, { AxiosRequestConfig, Canceler } from 'axios';

/** Podstawowy globalny config */
export const config: AxiosRequestConfig = {
  url: '/',
  method: 'GET',
  timeout: 20000,
  responseType: 'json',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: 2000,
  validateStatus: (status: number) => status >= 200 && status < 300,
  maxRedirects: 5,
  cancelToken: new axios.CancelToken((cancel: Canceler) => {}),
};
