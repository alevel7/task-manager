import { IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "../task.model";


export class GetTaskFiltersDto {
    @IsOptional()
    @IsEnum(Status)
    status?: Status;

    @IsOptional()
    @IsString()
    search?: string;
}