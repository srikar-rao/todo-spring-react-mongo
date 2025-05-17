export const TodoStatusEnum = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
} as const;

export type TodoStatusEnum = (typeof TodoStatusEnum)[keyof typeof TodoStatusEnum];

export interface Task {
    id: number;
    title: string;
    description?: string;
    status?: string;
    isCompleted: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface Todo {
    id: number;
    title: string;
    description: string;
    status: TodoStatusEnum;
    isCompleted: boolean;
    version: number;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    localeCreatedAt: string;
    localeUpdatedAt: string;
    tasks: Task[];
}
