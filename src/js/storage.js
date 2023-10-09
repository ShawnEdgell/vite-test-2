const STORAGE_KEY = "todos";
const DARK_MODE_STORAGE_KEY = "darkMode"; // Add this line

export function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadTodos() {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
}

export function saveDarkMode(isDarkMode) { // Add this function
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(isDarkMode));
}

export function loadDarkMode() { // Add this function
    const savedDarkMode = JSON.parse(localStorage.getItem(DARK_MODE_STORAGE_KEY));
    return savedDarkMode === true; // Return true for dark mode enabled, false otherwise
}
