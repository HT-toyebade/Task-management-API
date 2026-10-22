import { Controller, Get,Post, Body, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { AppService } from './app.service.js';
import { createTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}




  @Get()
 getTask(@Query('completed') completed?: string) {
  let completedFilter : boolean | undefined;

  if(completed === 'true'){
    completedFilter = true;
  }else if(completed === 'false'){
    completedFilter = false;
  }

  return this.appService.getTask(completedFilter);
 }



@Get('tasks/:id')
getTaskbyId(@Param('id', ParseIntPipe) id: number){
return this.appService.getTaskById(id);
}


  @Post('tasks')
 async createTask(@Body() body: createTaskDto) {
  const data = await this.appService.createTask(body.title, body.description);


  return {
    message: 'Task created Succcessfully ,',
    data: data,
  }
 }

@Patch('tasks/:id')
async updateTask(@Param('id', ParseIntPipe) id: number, @Body() updates: UpdateTaskDto) {
  const task = await this.appService.updateTask(id, updates);

  return {
    message: 'Task updated succcessfully',
    data: task,
  };
}

@Delete('tasks/:id')
async deleteTask(@Param('id', ParseIntPipe) id: number) {
  const task = await this.appService.deleteTask(id);

  return {
    message: 'Task deleted successsfully',
    data: task,
  };
}
}
