import { Request, Response } from "express";
import { connect, Types } from "mongoose";;
import { Config } from "../lib/config";
import { Book } from "../model/Book";

const config = new Config();
connect(config.getDB(), {useNewUrlParser: true});

/**
 * class BookController
 */
export class BookController {
    /**
     * Store a new book, returns _id and title or an error message
     *
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

            return res.status(201)
                .json({
                    book: {
                        _id: book._id,
                        title: book.title,
                        commentcount: 0
                    },
            });
        } catch (e) {
            return res.status(200)
                .json({
                    error: e.message,
            });
        }
    }

    /**
     * Fetch all books and transforms theirs data into a requested form
     *
     * @param req
     * @param res
     */
    public static async read(req: Request, res: Response) {
        let response = {};
        try {
            const library = await Book.find();
            response = {
                books: library.map((book: any) => {
                    return {
                        _id: book._id,
                        title: book.title,
                        commentcount: book.comments.length,
                    };
                }),
            };
        } catch (e) {
            response = {
                error: e
            };
        } finally {
            res.json(response);
        }
    }

    /**
     * Delete a specific book
     * @param req
     * @param res
     */
    public static async delete(req: Request, res: Response) {
        try {
            /**
             * Handle invalid _id
             */
            if (!Types.ObjectId.isValid(req.params.id)) {
                return res.json({ book: "no book exists"});
            }

            const id = Types.ObjectId(req.params.id);
            const book: any = await Book.findOne({_id: id});

            if (!book) {
                return res.json({ book: "no book exists"});
            }

            if (book.created_by.ip !== req.ip || book.created_by.system !== req.headers["user-agent"]) {
                return res.status(200)
                    .json({
                        error: "You cannot delete a book which is not registered by you!"
                    });
            }

            await book.remove();

            return res.status(201)
                .json({ book: "delete successful"});
        } catch (e) {
            return res.json({ error: e });
        }
    }

    /**
     * Show a specific book
     *
     * @param req
     * @param res
     */
    public static async show(req: Request, res: Response) {
        try {
            /**
             * Handle invalid _id
             */
            if (!Types.ObjectId.isValid(req.params.id)) {
                throw new Error("no book exists");
            }

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
                book: e.message
            });
        }
    }

    public static reset(req: Request, res: Response) {
    }
}
