export interface ErrorType {
  code: String | Number;
  message: String;
}

export const ErrorCodes = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};
