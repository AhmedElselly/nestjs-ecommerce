import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '../interfaces/comment.interface';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor (@InjectModel('Comment') private comment: Model<Comment>){}
  async create(createCommentDto: CreateCommentDto, req, res): Promise<any> {
    const comment = new this.comment(createCommentDto);
    comment.author = req.user;
    comment.post = req.params.postId;
    await comment.save();
    return res.json(comment);
  }

  async findAll(req, res): Promise<any> {
    const comments = await this.comment.find().populate(['author', 'post']);
    return res.json(comments);
  }

  async findOne(id: string, req, res): Promise<any> {
    const comment = await this.comment.findById(id);
    if(!comment) return res.status(400).json({message: 'Comment is not found!'});
    return res.json(comment);
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, res): Promise<any> {
    const comment = await this.comment.findById(id);
    comment.text = updateCommentDto.text;
    await comment.save();
    return res.json(comment);
  }

  async remove(id: string, res): Promise<any> {
    const comment = await this.comment.findById(id);
    await comment.remove();
    return res.json({message: 'Comment has been deleted successfully!'});
  }
}
