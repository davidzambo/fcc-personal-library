import { Request, Response } from "express";
import { connect, Types } from "mongoose";
import { Config } from "../lib/config";
import { Book } from "../model/Book";

connect(new Config().getDB(), {useNewUrlParser: true});

export class CommentController {
    /**
     * Create a new comment
     * @param req
     * @param res
     */
    public static async create(req: Request, res: Response) {
        try{
            // throw an error on invalid _id
            const id = Types.ObjectId(req.params.id);

            const book: any = await Book.findOne({_id : id});

            // throw a no book exists error
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
                    title: book.title,
                    _id: book._id,
                    comments: book.comments.map((b: any) => b.comment)
                }
            });
        } catch (e) {
            console.log(e);
            return res.json({
                book: "no book exists"
            });
        }
    }
}
