import express, {NextFunction, Request, Response, Errback} from "express";
import {json, urlencoded} from "body-parser";
import createError from "http-errors";
import * as path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sassMiddleware from "node-sass-middleware";

import {RouterHandler} from "./Router";

export class Application {
  public app: express.Application;

  constructor() {
    this.app = express();
    const app = this.app;
    app.set("views", "public/views");
    app.set("view engine", "ejs");

    app.use(json());
    app.use(urlencoded({extended: false}));

    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(sassMiddleware({
      src: "public",
      dest: "public",
      indentedSyntax: true,
      sourceMap: true
    }));
    app.use(express.static("public"));

    app.use("/", RouterHandler);

    // catch 404 and forward to error handler
    app.use(function (req: Request, res: Response, next: NextFunction) {
      next(createError(404));
    });

    // error handler
    app.use(function (err: HttpException, req: Request, res: Response, next: NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });
  }
}

export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
