const DARK_MODE_STORAGE_KEY = "darkMode";

export function initDarkModeToggle() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const bodyElem = document.body;

    function toggleDarkMode() {
        const isDarkMode = bodyElem.classList.toggle('dark-mode');
        localStorage.setItem(DARK_MODE_STORAGE_KEY, isDarkMode);
    }

    darkModeToggle.addEventListener('change', toggleDarkMode);

    // Initial state setup from local storage
    const savedDarkMode = localStorage.getItem(DARK_MODE_STORAGE_KEY);
    if (savedDarkMode === "true") {
        bodyElem.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
}
