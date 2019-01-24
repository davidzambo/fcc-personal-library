import { Request, Response } from "express";

export class HomeController {
    public static error(req: Request, res: Response) {
        res.json({
            message: "Ain't nobody got time for that..."
        });
    }
}