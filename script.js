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
        id: Date.now(),
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
        <span>${task.date}</span>
        <div class="card-bottom">
            <span>${task.status}</span>
            <button class="delete" data-id="${task.id}" >Delete</button>
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

    let deleteBtns = document.querySelectorAll(".delete");

    deleteBtns.forEach(btn => {
        btn.addEventListener("click", removeTask);
    });
}

function removeTask(e) {
    let id = e.target.dataset.id;

    tasks = tasks.filter(task => task.id != id);

    displayTasks();
}