export function formatDate(dateString) {
if (!dateString) {
return "No due date";
}


const date = new Date(`${dateString}T00:00:00`);

if (Number.isNaN(date.getTime())) {
    return "Invalid date";
}

return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
}).format(date);


}

export function isOverdue(dateString) {
if (!dateString) {
return false;
}


const today = new Date();
today.setHours(0, 0, 0, 0);

const dueDate = new Date(`${dateString}T00:00:00`);

if (Number.isNaN(dueDate.getTime())) {
    return false;
}

return dueDate < today;


}

export function getDueDateStatus(dateString, completed = false) {
if (completed || !dateString) {
return null;
}


const today = new Date();
today.setHours(0, 0, 0, 0);

const dueDate = new Date(`${dateString}T00:00:00`);

if (Number.isNaN(dueDate.getTime())) {
    return null;
}

const daysDifference = Math.round(
    (dueDate.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24)
);

if (daysDifference < 0) {
    return "overdue";
}

if (daysDifference === 0) {
    return "due-today";
}

if (daysDifference <= 3) {
    return "due-soon";
}

return null;


}

