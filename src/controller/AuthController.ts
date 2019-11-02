import fetch from "node-fetch"
import {Request, Response} from "express";
import btoa from "btoa";
import {Enum} from "../Enum";

export async function grantAuth(req: Request, res: Response) {
    const creds = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    const code = req.query.code;
    let redirectUr: string;
    if (process.env.DEVELOPMENT!!.toString() == "true") redirectUr = encodeURIComponent(Enum.devel_url+"api/oauth2/callback"); else redirectUr = encodeURIComponent(Enum.prod_url+"api/oauth2/callback");
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUr}`,
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${creds}`,
            },
        });
    return await response.json()
}

export async function refreshAuth(req: Request, res: Response) {
    const creds = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    const refresh_token: string = req.cookies["refresh+token"];
    let redirectUr: string;
    if (process.env.DEVELOPMENT!!.toString() == "true") redirectUr = encodeURIComponent(Enum.devel_url+"api/oauth2/callback"); else redirectUr = encodeURIComponent(Enum.prod_url+"api/oauth2/callback");
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=refresh_token&refresh_token=${refresh_token}&redirect_uri=${redirectUr}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${creds}`,
            },
        });
    return await response.json()
}

export async function revokeAuth(req: Request, res: Response) {
    const creds = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    const code = req.query.code;
    let redirectUr: string;
    if (process.env.DEVELOPMENT!!.toString() == "true") redirectUr = encodeURIComponent(Enum.devel_url+"api/oauth2/callback"); else redirectUr = encodeURIComponent(Enum.prod_url+"api/oauth2/callback");
    const response = await fetch(`https://discordapp.com/api/oauth2/token/revoke?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUr}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${creds}`,
            },
        });
    return await response.json()
}
