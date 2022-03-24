import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task.interface';
import { GetTaskFiltersDto } from './dto/get-task-filter.dto';
// import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService { 

    constructor(
        @InjectRepository(Task) private taskRepo: Repository<Task>
    ) {}

    async getTasks(filterDto: GetTaskFiltersDto): Promise<Task[]{
        const {status, title} = filterDto;

        // if (status) {
        //     tasks = this.tasks.filter(task => task.status status);
        // }else if (title) {
        //     tasks = this.tasks.filter(task => task.title.includes(title) || task.description.includes(title))
        // } else {
        //     return this.getAllTasks()
        // }
        // return tasks;
    }
    
    async updateATask(id: string, status: TaskStatus): Promise<Task> {
        const task: Task = await this.getTaskById(id);
        task.status = status;
        return task;
    }

    async deleteTaskById(id: string): Promise<void>{
        const result = await this.taskRepo.delete(id);

        if (result.affected === 0) {
           throw new NotFoundException('Task Not found')
        }
    }

    async getTaskById(id: string): Promise<Task> {
      const found = await this.taskRepo.findOne({ where: {id}})
      if (!found) {
          throw new NotFoundException('Task not found')
      }
      return found
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description } = createTaskDto;
        const task = this.taskRepo.create({
            title, description, status: TaskStatus.PENDING
        });

        await this.taskRepo.save(task);
        return task;
    }


}