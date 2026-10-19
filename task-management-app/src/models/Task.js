export default class Task {
constructor({
id = crypto.randomUUID(),
title,
description = "",
category = "Personal",
priority = "medium",
dueDate,
completed = false,
createdAt = new Date().toISOString()
}) {
this.id = id;
this.title = title.trim();
this.description = description.trim();
this.category = category;
this.priority = priority;
this.dueDate = dueDate;
this.completed = completed;
this.createdAt = createdAt;
}
}
