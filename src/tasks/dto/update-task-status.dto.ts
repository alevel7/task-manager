import { IsEnum } from "class-validator";
import { Status } from "../task.model";


export class UpdateTaskStatusDto {
    @IsEnum(Status)
    status: Status;
}