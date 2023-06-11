import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(CreateTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(CreateTaskDto);
    return createdTask.save();
  }

  async findAll() {
    return this.taskModel.find().exec();
  }

  async findOne(id: string) {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, task: UpdateTaskDto) {
    await this.taskModel.updateOne({ _id: id }, task).exec();
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.taskModel.deleteOne({ _id: id }).exec();
  }
}
