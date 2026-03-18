import { useState } from "react";
import type { Todo } from "../../features/todos/types";
import AddTodoModal from "../AddTodoModal/AddTodoModal";
import { useAppSelector } from "../../app/hooks";
import {
    selectFilteredTodos,
    selectViewMode,
} from "../../features/todos/selectors";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

const TodoList = () => {
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const todos = useAppSelector(selectFilteredTodos);
    const viewMode = useAppSelector(selectViewMode);

    const handleEdit = (todo: Todo) => {
        setEditingTodo(todo);
    };

    return (
        <>
            <div className={styles.list}>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        viewMode={viewMode}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
            {editingTodo && (
                <AddTodoModal
                    todo={editingTodo}
                    onClose={() => setEditingTodo(null)}
                />
            )}
        </>
    );
};

export default TodoList;
