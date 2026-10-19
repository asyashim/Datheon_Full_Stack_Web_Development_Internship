import { formatDate, isOverdue } from "../utils/dateUtils.js";

export function renderTasks(tasks, taskList) {
taskList.replaceChildren();


if (tasks.length === 0) {
    renderEmptyState(taskList);
    return;
}

const fragment = document.createDocumentFragment();

tasks.forEach((task) => {
    const taskCard = createTaskCard(task);
    fragment.appendChild(taskCard);
});

taskList.appendChild(fragment);


}

function createTaskCard(task) {
// Main task card
const card = document.createElement("article");
card.className = "task-item";


if (task.completed) {
    card.classList.add("completed");
}

// Checkbox
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.className = "task-checkbox";
checkbox.checked = task.completed;
checkbox.setAttribute("aria-label", `Mark ${task.title} as completed`);
checkbox.dataset.action = "toggle";
checkbox.dataset.id = task.id;

// Task content container
const content = document.createElement("div");
content.className = "task-content";

// Title
const title = document.createElement("h3");
title.className = "task-title";
title.textContent = task.title;

// Description
const description = document.createElement("p");
description.className = "task-description";
description.textContent = task.description || "No description provided.";

content.append(title, description);

// Task metadata
const metadata = document.createElement("div");
metadata.className = "task-meta";

const categoryBadge = createBadge(task.category);
const priorityBadge = createBadge(
    `Priority: ${task.priority}`,
    `priority-${task.priority}`
);

const dueDateBadge = createBadge(
    `Due: ${formatDate(task.dueDate)}`
);

metadata.append(categoryBadge, priorityBadge, dueDateBadge);

if (!task.completed && isOverdue(task.dueDate)) {
    const overdueBadge = createBadge("Overdue", "task-overdue");
    metadata.appendChild(overdueBadge);
}

content.appendChild(metadata);

// Edit and Delete buttons
const actions = document.createElement("div");
actions.className = "task-actions";

const editButton = document.createElement("button");
editButton.type = "button";
editButton.className = "task-action-button";
editButton.textContent = "Edit";
editButton.dataset.action = "edit";
editButton.dataset.id = task.id;
editButton.setAttribute("aria-label", `Edit ${task.title}`);

const deleteButton = document.createElement("button");
deleteButton.type = "button";
deleteButton.className = "task-action-button delete-button";
deleteButton.textContent = "Delete";
deleteButton.dataset.action = "delete";
deleteButton.dataset.id = task.id;
deleteButton.setAttribute("aria-label", `Delete ${task.title}`);

actions.append(editButton, deleteButton);

// Assemble the task card
card.append(checkbox, content, actions);

return card;


}

function createBadge(text, extraClass = "") {
const badge = document.createElement("span");


badge.className = extraClass
    ? `task-badge ${extraClass}`
    : "task-badge";

badge.textContent = text;

return badge;


}

function renderEmptyState(taskList) {
const emptyState = document.createElement("div");
emptyState.className = "empty-state";


const icon = document.createElement("div");
icon.className = "empty-state-icon";
icon.textContent = "✓";

const heading = document.createElement("h3");
heading.textContent = "You're all caught up!";

const message = document.createElement("p");
message.textContent = "Add a task to get your day started.";

emptyState.append(icon, heading, message);
taskList.appendChild(emptyState);


}
