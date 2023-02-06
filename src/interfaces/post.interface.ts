import { Types } from "mongoose";

export interface PostModel extends Document {
    title: string;
    description: string;
    price: number;
    author: Types.ObjectId;
}