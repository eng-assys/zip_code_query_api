import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.squema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserNotFoundException } from './errors/user-not-found-bad-request.error';
import * as bcrypt from 'bcrypt';
import configuration from '../config/configuration';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(body: CreateUserDto) {
    try {
      if (body.password)
        body.password = await this.createHashedPassword(body.password);

      const userModel = new this.userModel(body);
      const user = await userModel.save();
      delete user.password;
      return user;
    } catch (error) {
      // E11000 duplicate key error collection: test.users
      if (error.code === 11000) {
        throw new ConflictException(
          `The email ${body.email} is already in use`,
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new UserNotFoundException();

    delete user.password;

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.updateOne({ _id: id }, updateUserDto).exec();
    const updatedUser = await this.userModel.findById(id).exec();
    if (!updatedUser) throw new UserNotFoundException();

    delete updatedUser.password;

    return updatedUser;
  }

  async remove(id: string) {
    const deleteResponse = await this.userModel.deleteOne({ _id: id }).exec();

    if (!deleteResponse.deletedCount) throw new UserNotFoundException();
  }

  async checkIncomePassword(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword);
  }

  private async createHashedPassword(password: string) {
    return await bcrypt.hash(password, configuration().api.bcrypt.saltRounds);
  }
}
