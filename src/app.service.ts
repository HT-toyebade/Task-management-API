import { Injectable, NotFoundException,ConflictException} from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity.js';
import { createTaskDto } from './dto/create-task.dto.js';


@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}



 

async getTask(completed?:boolean) {
  if(completed === undefined){
  return this.taskRepository.find();
}
  return this.taskRepository.find({where:{completed}});
}


async createTask(title: string, description: string) {
  const existingTask = await this.taskRepository.findOne({where:{title}});
  if(existingTask){
    throw new ConflictException('A task with this title already exist ');

  }

  const task = this. taskRepository.create({ title, description});
  return this.taskRepository.save(task);
}


 async getTaskById(id: number) {
  const task = await this.taskRepository.findOne({where:{id}});

  if (!task) {
    throw new NotFoundException('Task not Found');
  }
  return task;
 }





async updateTask(id: number, updates: UpdateTaskDto) {
  const task = await this.getTaskById(id);

  if (updates.title !== undefined) {
    const existingTask = await this.taskRepository.findOne({
      where: { title: updates.title },
    });

    if (existingTask && existingTask.id !== id) {
      throw new ConflictException('A task with this title already exists');
    }

    task.title = updates.title;
  }

  if (updates.description !== undefined) {
    task.description = updates.description;
  }

  if (updates.completed !== undefined) {
    task.completed = updates.completed;
  }

  return this.taskRepository.save(task);
}
 
async deleteTask(id: number) {
  const task = await this.getTaskById(id);
  await this.taskRepository.delete(id);
  return task;
}


}


