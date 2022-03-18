import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Task, Status } from './task.model';
import { GetTaskFiltersDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTaskFiltersDto): Task[] {
       return this.taskService.getTasksBySearch(filterDto)
    }
    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string, @Body() updateTaskStatusDto:UpdateTaskStatusDto): Task {
       const { status } = updateTaskStatusDto;
        return this.taskService.updateATask(id, status);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) {
        return this.taskService.deleteTaskById(id);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }
}
