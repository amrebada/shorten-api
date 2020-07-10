import { ErrorCodes, ErrorType } from "./constants";
import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import config from "./config";
import bodyParser from "body-parser";
import routes from "./routes";
import { apiResponse } from "./utils";
import database from "./database";

const app: Application = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.all(
  "/*",
  apiResponse.bind(null, () => {
    throw <ErrorType>{
      code: ErrorCodes.NOT_FOUND,
      message: "Cannot find this resource",
    };
  })
);
database
  .connect()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`[+] Server app started on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.log("[!] cannot connect to database: ", err);
  });
