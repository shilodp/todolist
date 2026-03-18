import { useState } from "react";
import TodoList from "./components/TodoList/TodoList";
import Filters from "./components/Filters/Filters";
import AddTodoModal from "./components/AddTodoModal/AddTodoModal";
import styles from "./App.module.css";

function App() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1 className={styles.title}>Todo List</h1>

                <button
                    className={styles.addButton}
                    onClick={() => setOpen(true)}
                >
                    Add Todo
                </button>
            </header>

            <div className={styles.content}>
                <Filters />

                <TodoList />
            </div>

            {open && <AddTodoModal onClose={() => setOpen(false)} />}
        </div>
    );
}

export default App;
