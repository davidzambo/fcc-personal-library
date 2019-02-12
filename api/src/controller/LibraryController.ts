import { Request, Response } from "express";

export class LibraryController {
    public static index(req: Request, res: Response) {
        res.json(
            {
                message: 'Ain\'t nobody got time for that...'
            }
        );
    }

    public static error(req: Request, res: Response) {
        res.redirect("/");
    }
}