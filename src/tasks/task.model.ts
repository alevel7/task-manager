export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
}

export enum Status {
    DONE = 'DONE',
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS'
}