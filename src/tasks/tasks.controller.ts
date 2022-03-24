import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskStatus } from './task.interface';
import { GetTaskFiltersDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTaskFiltersDto): Promise<Task[]> {
       return this.taskService.getTasks(filterDto);
    }
    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string, @Body() updateTaskStatusDto:UpdateTaskStatusDto): Promise<Task> {
       const { status } = updateTaskStatusDto;
        return this.taskService.updateATask(id, status);
    }

    @Delete('/:id')
    async deleteTaskById(@Param('id') id: string) {

        return this.taskService.deleteTaskById(id);
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }
}
