import { Request, Response } from "express";
import { connect, Types } from "mongoose";
import { Config } from "../lib/config";
import { Book } from "../model/Book";

const config = new Config();
connect(config.getDB(), {useNewUrlParser: true});

/**
 * class CommentController
 */
export class CommentController {
    /**
     * Create a new comment to an existing book
     *
     * @param req
     * @param res
     */
    public static async create(req: Request, res: Response) {
        try {
            if (!req.body.comment) {
                throw new Error("missing comment");
            }

            const id = Types.ObjectId(req.params.id);
            const book: any = await Book.find({_id: id});

            if (!book) {
                throw new Error("no book exists");
            }

            book.comments.push({
                comment: req.body.comment,
                created_by: {
                    ip: req.ip,
                    system: req.headers["user-agent"]
                }
            });

            await book.save();

            return res.json({
               book: {
                   _id: book._id,
                   title: book.title,
                   comments: book.comments.map((b: any) => b.comment)
               }
            });
        } catch (e) {
            console.log(e);
            return res.json({
                book: "no book exists",
                error: e.message
            });
        }
    }
}
