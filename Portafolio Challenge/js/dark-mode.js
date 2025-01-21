const darkModeCheckbox = document.querySelector("#dark-mode-checkbox");

function changeDarkMode() {
    localStorage.darkMode = document.body.classList.toggle("dark")
        ? "dark"
        : "light";
}

function initDarkMode() {
    if (localStorage.darkMode === "light") return;
    if (localStorage.darkMode === "dark") {
        darkModeCheckbox.checked = true;
        changeDarkMode();
        return;
    }
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches) {
        darkModeCheckbox.checked = true;
        changeDarkMode();
    }
}

darkModeCheckbox.addEventListener("change", (e) => {
    changeDarkMode();
});

initDarkMode();