const STORAGE_KEY = "todos";

export function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadTodos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}
