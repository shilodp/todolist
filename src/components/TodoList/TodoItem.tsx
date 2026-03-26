import type { Todo, ViewMode } from "../../features/todos/types";
import { useAppDispatch } from "../../app/hooks";
import { toggleTodo, deleteTodo } from "../../features/todos/todosSlice";
import styles from "./TodoItem.module.css";

interface Props {
    todo: Todo;
    viewMode: ViewMode;
    onEdit: (todo: Todo) => void;
}

const TodoItem = ({ todo, viewMode, onEdit }: Props) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
    };

    const urgencyClass =
        todo.urgency === 1
            ? styles.urgencyHigh
            : todo.urgency === 2
              ? styles.urgencyMedium
              : styles.urgencyLow;

    const shortView = (
        <div className={styles.shortRow}>
            <label className={styles.label}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch(toggleTodo(todo.id))}
                />

                <span className={styles.title}>{todo.title}</span>
                <span className={`${styles.urgency} ${urgencyClass}`}>
                    U{todo.urgency}
                </span>
                <span className={styles.priority}>P{todo.priority}</span>

                <div className={styles.actions}>
                    <button
                        onClick={() => onEdit(todo)}
                        className={styles.edit}
                    >
                        Edit
                    </button>

                    <button onClick={handleDelete} className={styles.delete}>
                        Delete
                    </button>
                </div>
            </label>
        </div>
    );
    const fullView = (
        <>
            <div className={styles.header}>
                <h3 className={styles.title}>{todo.title}</h3>

                <div className={styles.actions}>
                    <button
                        onClick={() => onEdit(todo)}
                        className={styles.edit}
                    >
                        Edit
                    </button>

                    <button onClick={handleDelete} className={styles.delete}>
                        Delete
                    </button>
                </div>
            </div>

            <p className={styles.description}>{todo.description}</p>

            <div className={styles.meta}>
                <span className={`${styles.badge} ${urgencyClass}`}>
                    U{todo.urgency}
                </span>
                <span className={`${styles.badge} ${styles.priority}`}>
                    P{todo.priority}
                </span>
            </div>

            <div className={styles.footer}>
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(toggleTodo(todo.id))}
                    />
                    Completed
                </label>
            </div>
        </>
    );
    // const fullView = (
    //     <>
    //         <h3 className={styles.title}>{todo.title}</h3>

    //         <p className={styles.description}>{todo.description}</p>
    //         <p className={`${styles.urgency} ${urgencyClass}`}>
    //             Urgency: {todo.urgency}
    //         </p>
    //         <p className={styles.priority}>Priority: {todo.priority}</p>

    //         <label className={styles.checkbox}>
    //             <input
    //                 type="checkbox"
    //                 checked={todo.completed}
    //                 onChange={() => dispatch(toggleTodo(todo.id))}
    //             />
    //             Completed
    //         </label>

    //         <div className={styles.actions}>
    //             <button onClick={() => onEdit(todo)} className={styles.edit}>
    //                 Edit
    //             </button>

    //             <button onClick={handleDelete} className={styles.delete}>
    //                 Delete
    //             </button>
    //         </div>
    //     </>
    // );

    return (
        <div
            className={`${styles.item} ${todo.completed ? styles.completed : ""}`}
        >
            {viewMode === "short" ? shortView : fullView}
        </div>
    );
};

export default TodoItem;
