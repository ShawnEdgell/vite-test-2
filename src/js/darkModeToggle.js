export function initDarkModeToggle() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const bodyElem = document.body;

    // Function to toggle dark mode
    function toggleDarkMode() {
        bodyElem.classList.toggle('dark-mode');
    }

    // Event listener for dark mode toggle
    darkModeToggle.addEventListener('change', function() {
        toggleDarkMode();
    });

    // If the page loads and dark mode was previously set, adjust the switch
    if (bodyElem.classList.contains('dark-mode')) {
        darkModeToggle.checked = true;
    }
}