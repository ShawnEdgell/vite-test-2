const STORAGE_KEY = "todos";

export function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadTodos() {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
}
