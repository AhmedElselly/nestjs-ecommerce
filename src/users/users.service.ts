require('dotenv').config();
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserModel from '../schemas/user';
import {UserDocument} from '../interfaces/user.interface';
// import * as jwt from 'jsonwebtoken';
import {JwtService} from '@nestjs/jwt';
import { Model } from 'mongoose';


@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private user: UserDocument, private jwt: JwtService){}
  
  async register(createUserDto: CreateUserDto, res): Promise<any> {
    const user = new this.user(createUserDto);
    await user.setPassword(createUserDto.password);
    await user.save();
    return res.json(user);
  }

  async login(req, res): Promise<any> {
    const foundUser = await this.user.findOne({email: req.body.email});
    if(!foundUser) return res.status(400).json({message: 'User with that email doesn\'t exist! Please register.'});
    const {user} = await this.user.authenticate()(req.body.email, req.body.password);
    if(!user) return res.status(400).json({message: 'Email and password don\'t match!'});
    const token = this.jwt.sign({_id: user._id, username: user.username, email: user.email});
    return res.json({token, user});
  }

  async findAll(res): Promise<any> {
    const users = await this.user.find();
    return res.json(users);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
