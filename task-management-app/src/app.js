import TaskController from "./controllers/taskController.js";
import ThemeController from "./themeController.js";

document.addEventListener("DOMContentLoaded", () => {
    const taskController = new TaskController();
    taskController.init();

    const themeController = new ThemeController();
    themeController.init();

    console.log("TaskFlow application initialized successfully!");
});