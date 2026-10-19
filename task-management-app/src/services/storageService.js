const STORAGE_KEY = "taskflow_tasks";

export function getTasks() {
try {
const savedTasks = localStorage.getItem(STORAGE_KEY);


    if (!savedTasks) {
        return [];
    }

    const tasks = JSON.parse(savedTasks);

    return Array.isArray(tasks) ? tasks : [];
} catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
}


}

export function saveTasks(tasks) {
try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
return true;
} catch (error) {
console.error("Failed to save tasks:", error);
return false;
}
}
