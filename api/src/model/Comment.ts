import { model, Schema } from "mongoose";

export const commentSchema = new Schema({
    comment: {
      type: String,
      required: "missing comment",
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

export const Comment = model("Comment", commentSchema);
