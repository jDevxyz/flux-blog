import {Route} from "../Router"
import {NextFunction, Request, Response} from "express";
import fetch from "node-fetch";
import {Enum} from "../Enum";
import btoa from "btoa";

export class Main implements Route {
    executable = async function(req: Request, res: Response, next: NextFunction) {
        if (!req.query.token) throw new Error("No token provided!");
        const response = await fetch(`https://discordapp.com/api/users/@me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${req.query.token}`,
            },
        });
        const json = await response.json();
        res.render("profile", { data: json} )
    };
    meta = {
        method: "GET",
        path: "/profile"
    };
    name = "Profile"
}
