import { Controller, Get, Post, Body, Param, Delete, Req, Res, UseGuards, Put } from '@nestjs/common';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import CommentModel from '../schemas/comment';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create/:postId')
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: Request, @Res() res: Response) {
    return this.commentsService.create(createCommentDto, req, res);
  }

  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.commentsService.findAll(req, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    return this.commentsService.findOne(id, req, res);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Res() res: Response) {
    return this.commentsService.update(id, updateCommentDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.commentsService.remove(id, res);
  }
}
