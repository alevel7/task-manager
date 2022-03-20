import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task.interface';
import { GetTaskFiltersDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService { 

    constructor(
        @InjectRepository(TasksRepository) private taskRepo: TasksRepository
    ) {}
    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksBySearch(filterDto: GetTaskFiltersDto): Task[] {
    //     let tasks = [];
    //     const {status, title} = filterDto;

    //     if (status) {
    //         tasks = this.tasks.filter(task => task.status == status);
    //     }else if (title) {
    //         tasks = this.tasks.filter(task => task.title.includes(title) || task.description.includes(title))
    //     } else {
    //         return this.getAllTasks()
    //     }
    //     return tasks;
    // }
    
    // updateATask(id: string, status: TaskStatus): Task {
    //     const task: Task = this.getTaskById(id);
    //     task.status = status;
    //     return task;

    // }

    // deleteTaskById(id: string): Task[] | [] {
    //     this.getTaskById(id)
    //     this.tasks = this.tasks.filter( task => task.id !== id);
    //     return this.tasks;
    // }

    async getTaskById(id: string): Promise<Task> {
      const found = await this.taskRepo.findOne({ where: {id}})
      if (!found) {
          throw new NotFoundException('Task not found')
      }
      return found
    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const {title, description } = createTaskDto;
    //     const newTask : Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.DONE
    //     }
    //     this.tasks.push(newTask);
    //     return newTask;
    // }


}