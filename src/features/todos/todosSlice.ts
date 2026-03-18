import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TodosState, Urgency, Priority, ViewMode } from "./types";

const initialState: TodosState = {
    todos: [],
    filterPriority: null,
    filterUrgency: null,
    hideCompleted: false,
    viewMode: "short",
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<Omit<Todo, "id">>) {
            state.todos.push({
                ...action.payload,
                id: crypto.randomUUID(),
            });
        },

        toggleTodo(state, action: PayloadAction<string>) {
            const todo = state.todos.find((t) => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },

        deleteTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter((t) => t.id !== action.payload);
        },

        updateTodo(state, action: PayloadAction<Todo>) {
            const index = state.todos.findIndex(
                (t) => t.id === action.payload.id,
            );

            if (index !== -1) {
                state.todos[index] = action.payload;
            }
        },

        setUrgencyFilter(state, action: PayloadAction<Urgency | null>) {
            state.filterUrgency = action.payload;
        },

        setPriorityFilter(state, action: PayloadAction<Priority | null>) {
            state.filterPriority = action.payload;
        },

        toggleHideCompleted(state) {
            state.hideCompleted = !state.hideCompleted;
        },

        setViewMode(state, action: PayloadAction<ViewMode>) {
            state.viewMode = action.payload;
        },
    },
});

export const {
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setUrgencyFilter,
    setPriorityFilter,
    toggleHideCompleted,
    setViewMode,
} = todosSlice.actions;

export default todosSlice.reducer;
