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

    console.log('button clicked!');

    let title = taskName.value;
    let dueDate = taskDueDate.value;
    let status = taskStatus.value;

    tasks.push({
        name: title.charAt(0).toUpperCase() + title.slice(1),
        date: dueDate,
        status: status
    });

    taskName.value = "";
    taskDueDate.value = "";
    taskStatus.value = "To Do";

    displayTasks();
    console.log(tasks);
}

function displayTasks() {
    todoList.innerHTML = "";
    inProgressList.innerHTML = "";
    completeList.innerHTML = "";

    tasks.map(task => {
        const taskItem = document.createElement("li");

        taskItem.innerHTML = `
        <p>${task.name}</p>
        <div class="card-bottom">
            <span>${task.date}</span>
            <span>${task.status}</span>
        </div>
        `;

        if (task.status === "To Do") {
            todoList.appendChild(taskItem);
        } else if (task.status === "In Progress") {
            inProgressList.appendChild(taskItem);
        } else {
            completeList.appendChild(taskItem);
        }
    });
}