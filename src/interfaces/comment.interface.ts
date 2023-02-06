import { Types } from "mongoose";

export interface Comment extends Document {
    text: string;
    author: Types.ObjectId;
    post: Types.ObjectId;
}