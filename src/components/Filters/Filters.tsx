import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    setUrgencyFilter,
    setPriorityFilter,
    toggleHideCompleted,
    setViewMode,
} from "../../features/todos/todosSlice";
import { selectViewMode } from "../../features/todos/selectors";
import styles from "./Filters.module.css";

const Filters = () => {
    const dispatch = useAppDispatch();
    const viewMode = useAppSelector(selectViewMode);

    return (
        <div className={styles.wrapper}>
            <select
                className={styles.select}
                onChange={(e) =>
                    dispatch(
                        setUrgencyFilter(
                            e.target.value
                                ? (Number(e.target.value) as any)
                                : null,
                        ),
                    )
                }
            >
                <option value="">All urgency</option>

                <option value="1">Super urgent</option>
                <option value="2">Any time soon</option>
                <option value="3">Can wait</option>
            </select>

            <select
                className={styles.select}
                onChange={(e) =>
                    dispatch(
                        setPriorityFilter(
                            e.target.value
                                ? (Number(e.target.value) as any)
                                : null,
                        ),
                    )
                }
            >
                <option value="">All priorities</option>

                {[1, 2, 3, 4, 5].map((p) => (
                    <option key={p} value={p}>
                        Priority {p}
                    </option>
                ))}
            </select>

            <label className={styles.checkboxWrapper}>
                <input
                    type="checkbox"
                    onChange={() => dispatch(toggleHideCompleted())}
                />
                Hide completed
            </label>

            <label className={styles.checkboxWrapper}>
                <input
                    type="checkbox"
                    checked={viewMode === "full"}
                    onChange={(e) =>
                        dispatch(
                            setViewMode(e.target.checked ? "full" : "short"),
                        )
                    }
                />
                Full view
            </label>
        </div>
    );
};

export default Filters;
