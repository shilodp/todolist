import type { RootState } from "../../app/store";

export const selectTodos = (state: RootState) => state.todos;

export const selectViewMode = (state: RootState) => state.viewMode;

export const selectFilteredTodos = (state: RootState) => {
    let todos = [...state.todos];

    const { filterPriority, filterUrgency, hideCompleted } = state;

    if (filterPriority) {
        todos = todos.filter((t) => t.priority === filterPriority);
    }

    if (filterUrgency) {
        todos = todos.filter((t) => t.urgency === filterUrgency);
    }

    if (hideCompleted) {
        todos = todos.filter((t) => !t.completed);
    }

    return todos.sort((a, b) => {
        return a.urgency * 10 + a.priority - (b.urgency * 10 + b.priority);
    });
};
