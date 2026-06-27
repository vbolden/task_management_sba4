// CACHE VALUES
let taskName = document.getElementById("task-name");
let taskDueDate = document.getElementById("task-date");
let taskStatus = document.getElementById("task-status");
let todoList = document.getElementById("todo-list");
let inProgressList = document.getElementById("inprogress-list");
let completeList = document.getElementById("complete-list");
let overdueList = document.getElementById("overdue-list");
let addBtn = document.getElementById("add-btn");
let tasks = [];

// EVENT LISTENERS
addBtn.addEventListener("click", addTask);

// FUNCTIONS
function addTask(e) {
    e.preventDefault();

    let title = taskName.value;
    let dueDate = taskDueDate.value;
    let status = taskStatus.value;

    tasks.push({
        name: title.charAt(0).toUpperCase() + title.slice(1),
        date: dueDate,
        status: "To Do"
    });

    taskName.value = "";
    taskDueDate.value = "";
    taskStatus.value = "To Do";
}