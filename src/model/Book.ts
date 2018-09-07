import { Schema } from "mongoose";
import { commentSchema } from "./Comment";

export const bookSchema: Schema = new Schema({
    title: {
        type: String,
        required: "Please enter a book title",
    },
    comments: [commentSchema],
    created_at: {
        type: Date,
        default: Date.now,
    },
    created_by: {
        ip: String,
        system: String,
    },
});
