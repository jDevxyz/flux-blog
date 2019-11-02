import {Route} from "../Router"
import {NextFunction, Request, Response} from "express";
import {Enum} from "../Enum";

export class Main implements Route {
    executable = async function(req: Request, res: Response, next: NextFunction) {
        let redirectUr: string;
        if (process.env.DEVELOPMENT!!.toString() == "true") redirectUr = encodeURIComponent(Enum.devel_url+"api/oauth2/callback"); else redirectUr = encodeURIComponent(Enum.prod_url+"api/oauth2/callback");
        res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=548464135638220810&redirect_uri=${redirectUr}&response_type=code&scope=identify`)
    };
    meta = {
        method: "GET",
        path: "/login"
    };
    name = "Login"
}
