import { Types } from "mongoose";

export class CreatePostDto {
    title: string;
    description: string;
    price: number;
    author: Types.ObjectId;
}