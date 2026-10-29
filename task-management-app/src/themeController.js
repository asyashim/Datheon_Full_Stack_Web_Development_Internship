class ThemeController {
constructor() {
this.themeToggle = document.getElementById("theme-toggle");
}


init() {
    this.loadTheme();

    this.themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        this.saveTheme();
    });
}

saveTheme() {
    const isDarkMode = document.body.classList.contains("dark-mode");

    localStorage.setItem("dark-mode", isDarkMode);
}

loadTheme() {
    const savedTheme = localStorage.getItem("dark-mode");

    if (savedTheme === "true") {
        document.body.classList.add("dark-mode");
    }
}


}

export default ThemeController;
