import {Route} from "../Router"
import {NextFunction, Request, Response} from "express";
import {grantAuth, revokeAuth} from "../controller/AuthController";

export class Main implements Route {
    executable = async function(req: Request, res: Response, next: NextFunction) {
        if (!req.query.code) throw new Error("No code provided!");
        const json = await grantAuth(req, res);
        const access_token = json.access_token;
        const refresh_token = json.refresh_token;
        res.cookie("access_token", access_token, {
            expires: json.expires_in,
            httpOnly: true
        });
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true
        });
        res.redirect(`/profile?token=${access_token}`);
    };
    meta = {
        method: "GET",
        path: "/api/oauth2/callback"
    };
    name = "OAuth2"
}
