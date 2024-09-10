import { HttpResponse, HttpStatusCode } from './protocols';

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body,
});

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body,
});

export const notFound = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.NOT_FOUND,
    body: message,
  };
};

export const unprocessable = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.UNPROCESSABLE,
    body: message,
  };
};

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: 'Something went wrong',
  };
};

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
