import { Request, Response } from "express";
import { connect, Types } from "mongoose";
import { Config } from "../lib/config";
import { Book } from "../model/Book";

connect(new Config().getDB(), {useNewUrlParser: true});

export class BookController {
    /**
     * Store a new book, returns _id and title
     * or an error message
     * @param req
     * @param res
     */
    public static async create(req: Request, res: Response) {
        try {
            const book: any = new Book({
                title: req.body.title,
                comments: [],
                created_by: {
                    ip: req.ip,
                    system: req.headers["user-agent"],
                },
            });
            await book.save();
            return res.json({
                book: {
                    _id: book._id,
                    title: book.title
                },
            });
        } catch (e) {
            return res.json({
                error: e.message,
            });
        }
    }

    /**
     * Fetch all books and transforms theirs data into a requested form
     * @param req
     * @param res
     */
    public static async read(req: Request, res: Response) {
        const library = await Book.find();
        res.json({
            books: library.map((book: any) => {
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

    public static async show(req: Request, res: Response) {
        try {
            const id = Types.ObjectId(req.params.id);
            const book: any = await Book.findOne({_id: id});

            if (!book) {
                throw new Error("no book exists");
            }

            return res.json({
                book : {
                    _id: book._id,
                    title: book.title,
                    comments: book.comments
                }
            });
        } catch (e) {
            return res.json({
                book: "no book exists"
            });
        }
    }

    public static reset(req: Request, res: Response) {
    }
}
