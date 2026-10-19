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
