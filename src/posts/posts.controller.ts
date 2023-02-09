import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { CreatePostDto } from '../dtos/post.dto';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const post = await this.postsService.create(createPostDto, req, res);
    return post;
  }

  @Get()
  async index(@Req() req: Request, @Res() res: Response): Promise<any> {
    const posts = await this.postsService.index(req, res);
    return posts;
  }
}
