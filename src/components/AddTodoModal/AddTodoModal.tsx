import { useEffect, useRef, useState } from "react";
import type { Todo } from "../../features/todos/types";
import { useAppDispatch } from "../../app/hooks";
import { addTodo, updateTodo } from "../../features/todos/todosSlice";
import styles from "./AddTodoModal.module.css";

interface Props {
    onClose: () => void;
    todo?: Todo;
}

const AddTodoModal = ({ onClose, todo }: Props) => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [title, setTitle] = useState<string>(todo?.title ?? "");
    const [description, setDescription] = useState<string>(
        todo?.description ?? "",
    );
    const [urgency, setUrgency] = useState<number>(todo?.urgency ?? 2);
    const [priority, setPriority] = useState<number>(todo?.priority ?? 3);

    const submit = (event: React.SubmitEvent) => {
        event.preventDefault();
        if (title) {
            if (todo) {
                dispatch(
                    updateTodo({
                        ...todo,
                        title,
                        description,
                        priority: priority as any,
                        urgency: urgency as any,
                    }),
                );
            } else {
                dispatch(
                    addTodo({
                        title,
                        description,
                        priority: priority as any,
                        urgency: urgency as any,
                        completed: false,
                    }),
                );
            }

            onClose();
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className={styles.overlay}>
            <form className={styles.modal} onSubmit={submit}>
                <h2 className={styles.title}>
                    {todo ? "Edit Todo" : "Add Todo"}
                </h2>

                <input
                    className={styles.input}
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    ref={inputRef}
                />

                <textarea
                    className={styles.textarea}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    className={styles.select}
                    value={urgency}
                    onChange={(e) => setUrgency(Number(e.target.value))}
                >
                    <option value="1">Super urgent</option>
                    <option value="2">Any time soon</option>
                    <option value="3">Can wait</option>
                </select>

                <select
                    className={styles.select}
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                >
                    {[1, 2, 3, 4, 5].map((p) => (
                        <option key={p} value={p}>
                            Priority {p}
                        </option>
                    ))}
                </select>

                <div className={styles.buttons}>
                    <button type="submit" className={styles.button}>
                        {todo ? "Save" : "Add"}
                    </button>

                    <button
                        type="button"
                        className={`${styles.button} ${styles.cancel}`}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTodoModal;
