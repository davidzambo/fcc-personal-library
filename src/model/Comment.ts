import { Schema } from "mongoose";

export const commentSchema = new Schema({
    comment: {
      type: String,
      required: "Please submit a comment",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    created_by: {
        ip: String,
        system: String,
    },
});
