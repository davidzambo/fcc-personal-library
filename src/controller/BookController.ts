import { Request, Response } from "express";
import { connect, model } from "mongoose";
import { Config } from "../lib/config";
import { bookSchema } from "../model/Book";

const config = new Config();
connect(config.getDB(), {useNewUrlParser: true});
const Book = model("Book", bookSchema);

export class BookController {
    public static async create(req: Request, res: Response) {
        try {
            const book = new Book({
                title: req.body.title,
                comments: [],
                created_by: {
                    ip: req.ip,
                    system: req.headers["user-agent"],
                },
            });
            await book.save();
            BookController.read(req, res);
        } catch (e) {
            return res.json({
                error: e.message,
            });
        }
    }

    public static async read(req: Request, res: Response) {
        const library = await Book.find();
        res.json({
            book: library.map((book: any) => {
                return {
                    _id: book._id,
                    title: book.title,
                    commentcount: book.comments.length,
                };
            }),
        });
    }

    public static delete(req: Request, res: Response) {
    }

    public static show(req: Request, res: Response) {
    }

    public static reset(req: Request, res: Response) {
    }
}
