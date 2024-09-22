import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from '../auth/dto';
import { UpdateUserDto } from './dto';
import { User, UserDocument } from '../../schemas';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.findOneByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }
    const createdUser = new this.userModel(registerDto);
    return createdUser.save();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
