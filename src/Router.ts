import {Request, Response, NextFunction, Router, RequestHandler} from "express";
import {readdirSync} from "fs";

const method = "get";
const path = "/path";

const router = Router();
readdirSync("src/routes").forEach(function(path: string) {
    const route: Route = new (require(`./routes/${path}`).Main)
    switch(route.meta.method) {
        case "GET": { router.get(route.meta.path, route.executable); break }
        case "POST": { router.post(route.meta.path, route.executable); break }
        default: { router.get(route.meta.path, route.executable); }
    }
});

router.get("/", function(req: Request, res: Response, next: NextFunction) {
    res.render("index", { title: "Fluxblog"})
});

router[method](path, function(req: Request, res: Response, next: NextFunction) {
    res.render("index", { title: "This is a sample of handling index"})
});

export interface Route {
    name: string
    meta: RouteMeta
    executable: RequestHandler
}
export interface RouteMeta {
    method: any
    path: string
}

export const RouterHandler = router;
