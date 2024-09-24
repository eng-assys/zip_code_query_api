import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cat.squema';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  findOne(id: string): Promise<Cat> {
    return this.catModel.findById(id).exec();
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    await this.catModel.updateOne({ _id: id }, updateCatDto).exec();

    return await this.catModel.findById(id).exec();
  }

  remove(id: string) {
    this.catModel.deleteOne({ _id: id }).exec();
  }
}
