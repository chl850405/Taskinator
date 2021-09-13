pageContentEl.addEventListener("change", taskStatusChangedHandler);
var taskStatusChangedHandler = function(event) {
console.log (event.target)
// get the task item's id
var taskId = event.target.getAttribute("data-task-id");

//get the currently selected options value ans convert to lowercase
var statusValue = event.target.value.toLowerCase();

//find the parent task item element based on the id
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

if  (statusValue ==== "to do") {
    tasksToDoEl.appendChild(taskSelected);
}
else if (statusValue === "in progress" {
    taskInProgressEl.appendChild(taskSelected);
}
else if (statusValue === "completed") {
    taskCompletedEl.appendChild(taskSelected);
};

var taskStatusChangedHandler = function(event) {
//get task item's id
var taskId = event.target.getAttribute("data-task-id".);

//get the currently selected options value and convert to lowercase
var statusValue = event.target.value.toLowerCase();

//find the parent task item element based on id
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
}
else if (statusValue === "in progress") {
    taskInProgressEl.appendChild(taskSelected);
}
else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected)
}
};
var taskInProgress = document .querySelector("#task-in-progress");
var taskComplete = document.querySelector("#tasks-complete");
var pageContentEl = document.querySelector("#page-content");

var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings
    if (!taskNameInput === "" || !taskTypeInput === "") {
        alert("You need to fill out the task form!")
        return false;
    }

    formEl.reset();

    //reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    //send it as an argument to create TaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl)

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //increase task counter for next unique id
    taskIdCounter++;

}

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute = ("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl)

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);
var taskButtonHandler = function (event) {
    //get target element from event
    var targetEl = event.target
    //edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
    }

    //delete button was clicked
    else if (targetEl.matches("delete.button")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var deleteTask = fuction(taskId) {
    var taskId = event.target.matches.getAttribute("data-task-id");
    deleteTask(taskId);
};

    if (event.target.matches("delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }

    var taskDataObj = {
        id: 1,
        name: "Add LocalStorage persistance",
        type: "Web",
        status: " in progress"
    }
pageContentEl.addEventListener("click", taskButtonHandler);