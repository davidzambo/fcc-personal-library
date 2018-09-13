import { Request, Response } from "express";
import { connect, Types } from "mongoose";
import { Config } from "../lib/config";
import { Book } from "../model/Book";
import { Comment } from "../model/Comment";

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
            /**
             * Handle invalid _id
             */
            if (!Types.ObjectId.isValid(req.params.id)) {
                throw new Error("no book exists");
            }

            const id = new Types.ObjectId(req.params.id);
            const book: any = await Book.findOne({_id: id});

            /**
             * Handle no-book case
             */
            if (!book) {
                throw new Error("no book exists");
            }

            const comment = new Comment({
                comment: req.body.comment,
                created_by : {
                    ip: req.ip,
                    system: req.headers["user-agent"]
                }
            });

            book.comments.push(await comment.save());

            await book.save();

            return res.json({
               book: {
                   _id: book._id,
                   title: book.title,
                   comments: book.comments.map((b: any) => b.comment)
               }
            });
        } catch (e) {
            let response: any;
            if (e.name === "ValidationError" && e.errors && e.errors.comment) {
                response = {
                    error: e.errors.comment.message,
                };
            } else {
                response = {
                    book: e.message
                };
            }
            return res.json(response);
        }
    }
}
