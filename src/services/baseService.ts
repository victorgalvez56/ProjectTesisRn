export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

export type ErrorHandler = (error: string) => void;
export type FetchResponse = {
  success: boolean;
  message: string;
};

export async function myFetch<T extends FetchResponse>(
  endpoint: string,
  pay: string,
  resultHandler: (response: T) => void,
  errorHandler: ErrorHandler,
  method = HttpMethod.POST,
  aditionalHeaders?: {[key: string]: string},
) {
  const parse = JSON.parse(pay);
  const payload = {...parse};
  const url =
    'https://backend.snapcode.app/api/' + endpoint;
  const body = method !== HttpMethod.GET ? {body: JSON.stringify(payload)} : {};

  const request = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...aditionalHeaders,
    },
    ...body,
  };

  return fetch(url, request)
    .then(async response => {
      if (response.status >= 500) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((data: T) => {
      resultHandler(data);
    })
    .catch((error: Error) => {
      errorHandler(error.message);
    });
}
