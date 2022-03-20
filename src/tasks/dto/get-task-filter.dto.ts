import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.interface";

export class GetTaskFiltersDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    title?: string;
}