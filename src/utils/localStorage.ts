const KEY = "todos_state";

export const loadState = () => {
    try {
        const serialized = localStorage.getItem(KEY);
        if (!serialized) return undefined;
        return JSON.parse(serialized);
    } catch {
        return undefined;
    }
};

export const saveState = (state: any) => {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem(KEY, serialized);
    } catch {}
};
