import { Request, Response } from "express";

export class LibraryController {
    public static index(req: Request, res: Response) {
        console.log("now");
        res.sendFile('index.html');
    }
}