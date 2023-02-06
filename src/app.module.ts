import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import {MongooseModule} from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/ecommerce_nestjs'), PostsModule, UsersModule, CommentsModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
