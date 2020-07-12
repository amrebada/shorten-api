import { ErrorCodes, ErrorType } from "./constants";
import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import routes from "./routes";
import { apiResponse } from "./utils";
import config from "./config";
import database from "./database";
const Documentation = require("../swagger.json");

const app: Application = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/explore", swaggerUI.serve, swaggerUI.setup(Documentation));

app.use("/api/v1", routes);

app.all(
  "/*",
  apiResponse.bind(null, () => {
    throw <ErrorType>{
      code: ErrorCodes.NOT_FOUND,
      message: "Cannot find this resource, see docs on /api/v1/explore",
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
