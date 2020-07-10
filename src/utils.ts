import { ErrorType, ErrorCodes } from "./constants";
import { Response, Request } from "express";

export const apiResponse = async (
  cb: (req?: Request, res?: Response) => any,
  req: Request,
  res: Response
) => {
  try {
    const data = await cb(req, res);
    res.json(response(null, data));
  } catch (error) {
    res.json(response({ code: error.code, message: error.message }));
  }
};

export const response = (error: ErrorType | null, data?: any) => {
  return {
    success: !error,
    data: !!error ? null : data,
    error,
  };
};

export const checkParams = (...params: any) => {
  for (const param of params) {
    if (param === undefined || param === null || param === "") {
      throw <ErrorType>{
        code: ErrorCodes.BAD_REQUEST,
        message: "some parameters is not passed",
      };
    }
  }
};
