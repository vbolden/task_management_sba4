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
let draggedTask = null;

// EVENT LISTENERS
addBtn.addEventListener("click", addTask);

document.addEventListener("click", e => {
    if (e.target.classList.contains("delete")) {
        removeTask(e);
    }
});

// FUNCTIONS
function addTask(e) {
    e.preventDefault();

    // console.log('button clicked!');

    let title = taskName.value;
    let dueDate = taskDueDate.value;
    let status = taskStatus.value;

    // VALIDATION
    if (title === "") {
        alert("Please enter a task name!");
        return;
    }

    if (dueDate === "") {
        alert("Please choose a due date.");
        return;
    }

    tasks.push({
        id: Date.now(),
        name: title.charAt(0).toUpperCase() + title.slice(1),
        date: dueDate,
        status: status
    });

    taskName.value = "";
    taskDueDate.value = "";
    taskStatus.value = "To Do";

    overdueTasks();
    displayTasks();
    console.log(tasks);
}

function displayTasks() {
    todoList.innerHTML = "";
    inProgressList.innerHTML = "";
    completeList.innerHTML = "";
    overdueList.innerHTML = "";

    tasks.map(task => {
        const taskItem = document.createElement("li");
        taskItem.setAttribute("draggable", true);

        taskItem.innerHTML = `
        <p>${task.name}</p>
        <span>${task.date}</span>
        <div class="card-bottom">
            <span>${task.status}</span>
            <button class="delete" data-id="${task.id}" >Delete</button>
        </div>
        `;

        let deleteButton = taskItem.querySelector(".delete");

        deleteButton.addEventListener("mousedown", e => {
            e.stopPropagation();
        });

        if (task.status === "To Do") {
            todoList.appendChild(taskItem);
        } else if (task.status === "In Progress") {
            inProgressList.appendChild(taskItem);
        } else if (task.status === "Complete") {
            completeList.appendChild(taskItem);
        } else if (task.status === "Overdue") {
            overdueList.appendChild(taskItem);
        }

        taskItem.addEventListener("dragstart", (e) => {
            draggedTask = task.id;
            e.dataTransfer.setData("text/plain", task.id);
            taskItem.classList.add("dragging");
        });

        taskItem.addEventListener("dragend", () => {

            taskItem.classList.remove("dragging");

        });
    });
}

[todoList, inProgressList, completeList].forEach(column => {
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();

        const droppedId = e.dataTransfer.getData("text/plain");

        const targetColumn = e.currentTarget;

        tasks = tasks.map(task => {
            if (Number(task.id) === Number(droppedId)) {

                if (targetColumn.id === "todo-list") {
                    task.status = "To Do";

                } else if (targetColumn.id === "inprogress-list") {
                    task.status = "In Progress";

                } else if (targetColumn.id === "complete-list") {
                    task.status = "Complete";
                }
            }
            return task;
        });
        draggedTask = null;
        overdueTasks();
        displayTasks();
    });
});

function removeTask(e) {
    let id = e.target.dataset.id;

    tasks = tasks.filter(task => task.id != id);

    overdueTasks();
    displayTasks();
}

function overdueTasks() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    tasks = tasks.map(task => {
        let taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);

        if (taskDate < today && task.status !== "Complete") {
            task.status = "Overdue";
        }

        return task;
    });
}