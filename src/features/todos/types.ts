export type Priority = 1 | 2 | 3 | 4 | 5;

export type Urgency = 1 | 2 | 3;

export type ViewMode = "short" | "full";

export interface Todo {
    id: string;
    title: string;
    description: string;
    urgency: Urgency;
    priority: Priority;
    completed: boolean;
}

export interface TodosState {
    todos: Todo[];
    filterPriority: Priority | null;
    filterUrgency: Urgency | null;
    hideCompleted: boolean;
    viewMode: ViewMode;
}
