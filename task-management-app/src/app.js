import TaskController from "./controllers/taskController.js";

document.addEventListener("DOMContentLoaded", () => {
const taskController = new TaskController();


taskController.init();

console.log("TaskFlow application initialized successfully!");


});
