import {Route} from "../Router"
import {NextFunction, Request, Response} from "express";

export class Main implements Route {
    executable = function(req: Request, res: Response, next: NextFunction) {
        res.json({
            "uwu": "lol",
            "dotenv": `${process.env.CLIENT_ID}`
        })
    };
    meta = {
        method: "GET",
        path: "/test"
    };
    name = "Test"
}
