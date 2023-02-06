import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Model } from 'mongoose';
import { ParsedQs } from 'qs';
import { PostModel } from 'src/interfaces/post.interface';
import { CreatePostDto } from 'src/dtos/post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private post: Model<PostModel>) {}

  async create(postReq: CreatePostDto, req, res): Promise<any> {
    const post = new this.post(postReq);
    post.author = req.user;
    await post.save();
    return res.json(post);
  }

  async index(req, res): Promise<any> {
    const posts = await this.post.find().populate('author');
    return res.json(posts);
  }
}
