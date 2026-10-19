import { isOverdue } from "../utils/dateUtils.js";

export function renderDashboard(tasks) {
const totalTasks = tasks.length;


const completedTasks = tasks.filter(
    (task) => task.completed
).length;

const pendingTasks = tasks.filter(
    (task) => !task.completed
).length;

const overdueTasks = tasks.filter(
    (task) => !task.completed && isOverdue(task.dueDate)
).length;

updateStat("total-tasks", totalTasks);
updateStat("pending-tasks", pendingTasks);
updateStat("completed-tasks", completedTasks);
updateStat("overdue-tasks", overdueTasks);


}

function updateStat(elementId, value) {
const element = document.getElementById(elementId);


if (element) {
    element.textContent = value;
}


}
