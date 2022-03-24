import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository,DataSource } from 'typeorm'
import { Task } from './task.entity';

// @EntityRepository(Task)
// export class TasksRepository extends Repository<Task>{}
// const dataSource = new DataSource()

// export const TaskRepository = dataSource.getRepository(Task)

// export class TaskController {

// }