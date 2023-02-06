import { Types } from "mongoose";

export class CreateCommentDto {
    text: string;
    author: Types.ObjectId;
    post: Types.ObjectId;
}
