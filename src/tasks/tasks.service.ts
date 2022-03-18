import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Status, Task } from './task.model';
import {v4 as uuid} from 'uuid';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService { 
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksBySearch(filterDto: GetTaskFilterDto): Task[] {
        let tasks = [];
        const {status, title} = filterDto;

        if (status) {
            tasks = this.tasks.filter(task => task.status == status);
        }else if (title) {
            tasks = this.tasks.filter(task => task.title.includes(title) || task.description.includes(title))
        } else {
            return this.getAllTasks()
        }
        return tasks;
    }
    
    updateATask(id: string, status: Status): Task {
        const task: Task = this.getTaskById(id);
        task.status = status;
        return task;

    }

    deleteTaskById(id: string): Task[] | [] {
        this.getTaskById(id)
        this.tasks = this.tasks.filter( task => task.id !== id);
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);

        if (!found) {
            throw new NotFoundException();
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description } = createTaskDto;
        const newTask : Task = {
            id: uuid(),
            title,
            description,
            status: Status.DONE
        }
        this.tasks.push(newTask);
        return newTask;
    }


}