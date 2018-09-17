import { Request, Response } from "express";

export class LibraryController {
    public static index(req: Request, res: Response) {
        res.sendFile(__dirname + '../views/index.html');
    }
}