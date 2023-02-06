import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import helmet from 'helmet';
import * as cors from 'cors';
import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import * as session from 'express-session';
import UserModel from './schemas/user';

const PORT = process.env.PORT || 8001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.use(cors());
  app.use(helmet());
  app.use(session({
    secret: 'amazingcodingofnestjs',
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(UserModel.authenticate()));
  passport.serializeUser(UserModel.serializeUser());
  passport.deserializeUser(UserModel.deserializeUser());

  await app.listen(PORT);
  console.log(`Server is on http://localhost:${PORT}`);
}
bootstrap();
