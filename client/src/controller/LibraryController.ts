import { Request, Response } from "express";

export class LibraryController {
    public static index(req: Request, res: Response) {
        res.sendFile("index.html");
    }

    public static error(req: Request, res: Response) {
        res.redirect("/");
    }
}