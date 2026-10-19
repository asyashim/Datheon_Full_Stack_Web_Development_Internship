import Task from "../models/Task.js";
import { getTasks, saveTasks } from "../services/storageService.js";
import { renderTasks } from "../views/taskView.js";
import { renderDashboard } from "../views/dashboardView.js";

export default class TaskController {
constructor() {
this.tasks = getTasks();
this.taskList = document.getElementById("task-list");


    this.taskForm = document.getElementById("task-form");
    this.taskDialog = document.getElementById("task-dialog");

    this.addTaskButton = document.getElementById("add-task-button");
    this.closeDialogButton = document.getElementById("close-dialog-button");
    this.cancelDialogButton = document.getElementById("cancel-dialog-button");

    this.dialogTitle = document.getElementById("dialog-title");
    this.editingTaskId = null;
    this.currentFilter = "all";
    this.deleteDialog = document.getElementById("delete-dialog");

this.cancelDeleteButton = document.getElementById(
    "cancel-delete-button"
);

this.confirmDeleteButton = document.getElementById(
    "confirm-delete-button"
);

this.pendingDeleteTaskId = null;

this.searchInput = document.getElementById("search-input");

this.searchQuery = "";
}

init() {
    this.bindEvents();
    this.refreshView();
}

bindEvents() {

    this.searchInput.addEventListener("input", (event) => {
    this.searchQuery = event.target.value.trim().toLowerCase();

    this.refreshView();
});

    this.cancelDeleteButton.addEventListener("click", () => {
    this.closeDeleteDialog();
});

this.confirmDeleteButton.addEventListener("click", () => {
    this.confirmDelete();
});

this.deleteDialog.addEventListener("click", (event) => {
    if (event.target === this.deleteDialog) {
        this.closeDeleteDialog();
    }
});
    this.addTaskButton.addEventListener("click", () => {
        this.openCreateDialog();
    });

    this.closeDialogButton.addEventListener("click", () => {
        this.closeDialog();
    });

    this.cancelDialogButton.addEventListener("click", () => {
        this.closeDialog();
    });

    this.taskForm.addEventListener("submit", (event) => {
        this.handleFormSubmit(event);
    });

    this.taskList.addEventListener("click", (event) => {
        this.handleTaskAction(event);
    });

    this.taskList.addEventListener("change", (event) => {
        this.handleTaskCompletion(event);
    });

    document.querySelectorAll(".nav-link[data-filter]").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        this.currentFilter = link.dataset.filter;

        document.querySelectorAll(".nav-link[data-filter]").forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        this.refreshView();
    });
});
}

openCreateDialog() {
    this.editingTaskId = null;
    this.taskForm.reset();

    document.getElementById("task-id").value = "";
    this.dialogTitle.textContent = "Create a New Task";

    this.taskDialog.showModal();
}

openEditDialog(taskId) {
    const task = this.tasks.find((item) => item.id === taskId);

    if (!task) {
        return;
    }

    this.editingTaskId = taskId;

    document.getElementById("task-id").value = task.id;
    document.getElementById("task-title").value = task.title;
    document.getElementById("task-description").value = task.description;
    document.getElementById("task-category").value = task.category;
    document.getElementById("task-priority").value = task.priority;
    document.getElementById("task-due-date").value = task.dueDate || "";

    this.dialogTitle.textContent = "Edit Task";

    this.taskDialog.showModal();
}

closeDialog() {
    if (this.taskDialog.open) {
        this.taskDialog.close();
    }

    this.taskForm.reset();
    this.editingTaskId = null;
}

handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this.taskForm);

    const taskData = {
        title: formData.get("title"),
        description: formData.get("description") || "",
        category: formData.get("category") || "Personal",
        priority: formData.get("priority") || "medium",
        dueDate: formData.get("dueDate") || ""
    };

    if (!taskData.title || !taskData.title.trim()) {
        return;
    }

    if (this.editingTaskId) {
        this.updateTask(this.editingTaskId, taskData);
    } else {
        this.createTask(taskData);
    }

    this.closeDialog();
}

createTask(taskData) {
    const task = new Task(taskData);

    this.tasks.push(task);

    this.persistAndRefresh();
}

updateTask(taskId, updatedData) {
    this.tasks = this.tasks.map((task) => {
        if (task.id === taskId) {
            return {
                ...task,
                ...updatedData,
                title: updatedData.title.trim(),
                description: updatedData.description.trim()
            };
        }

        return task;
    });

    this.persistAndRefresh();
}

deleteTask(taskId) {
    const taskExists = this.tasks.some(
        (task) => task.id === taskId
    );

    if (!taskExists) {
        return;
    }

    this.pendingDeleteTaskId = taskId;
    this.deleteDialog.showModal();
}

closeDeleteDialog() {
    if (this.deleteDialog.open) {
        this.deleteDialog.close();
    }

    this.pendingDeleteTaskId = null;
}

confirmDelete() {
    if (!this.pendingDeleteTaskId) {
        return;
    }

    const taskId = this.pendingDeleteTaskId;

    this.tasks = this.tasks.filter(
        (task) => task.id !== taskId
    );

    this.pendingDeleteTaskId = null;
    this.deleteDialog.close();

    this.persistAndRefresh();
}

toggleTaskCompletion(taskId, completed) {
    this.tasks = this.tasks.map((task) => {
        if (task.id === taskId) {
            return { ...task, completed };
        }

        return task;
    });

    this.persistAndRefresh();
}

handleTaskAction(event) {
    const button = event.target.closest("button[data-action]");

    if (!button || !this.taskList.contains(button)) {
        return;
    }

    const taskId = button.dataset.id;
    const action = button.dataset.action;

    if (action === "edit") {
        this.openEditDialog(taskId);
    } else if (action === "delete") {
        this.deleteTask(taskId);
    }
}

handleTaskCompletion(event) {
    const checkbox = event.target;

    if (
        !checkbox.matches('input[data-action="toggle"]') ||
        !this.taskList.contains(checkbox)
    ) {
        return;
    }

    this.toggleTaskCompletion(
        checkbox.dataset.id,
        checkbox.checked
    );
}


getFilteredTasks() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.tasks.filter((task) => {

        // 1. Search by task title or description
        const query = this.searchQuery || "";

        const matchesSearch =
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query);

        if (!matchesSearch) {
            return false;
        }

        // 2. Filter by sidebar selection
        if (this.currentFilter === "today") {
            if (task.completed || !task.dueDate) {
                return false;
            }

            const dueDate = new Date(`${task.dueDate}T00:00:00`);

            return dueDate.getTime() === today.getTime();
        }

        if (this.currentFilter === "upcoming") {
            if (task.completed || !task.dueDate) {
                return false;
            }

            const dueDate = new Date(`${task.dueDate}T00:00:00`);

            return dueDate > today;
        }

        if (this.currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });
}


    

persistAndRefresh() {
    const saved = saveTasks(this.tasks);

    if (!saved) {
        console.error("Could not save tasks. Your changes may not persist.");
    }

    this.refreshView();
}

refreshView() {
    const filteredTasks = this.getFilteredTasks();

    renderTasks(filteredTasks, this.taskList);
    renderDashboard(this.tasks);
    
}


}
