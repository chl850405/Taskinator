var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var taskCompletedEl = document.querySelector("#task-completed");
var pageContentEl = document.querySelector("#page-content");

//and array that hold tasks for saving
var tasks = [];

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //check if input values are empty strings
  if (!taskNameInput  || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  //reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  // check if task is new or one being edited by seeing if it has a data-task-id
  var isEdit = formEl.hasAttribute("data-task-id");
  //has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    };
    createTaskEl(taskDataObj);
  }
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
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl)

  switch (taskDataObj.status) {
    case "to do":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
      tasksToDoEl.append(listItemEl);
      break;
      case "in progress":
        taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
        tasksInProgressEl.append(listItemEl);
        break;
        case "completed":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
          tasksCompletedEl.append(listItemEl);
          break;
        default:
          console.log("Something went wrong!")
  }

  // save task as an object with name, type, status and id propertied then push it into task arry
  taskDataObj.id = taskIdCounter;

  tasks.push(taskDataObj);

  saveTasks();

  //increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function (taskId) {
  //create container to hold elements
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute = ("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  // create status options
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

var completeEditTask = function (taskName, taskType, taskId) {
  //find the task list with taskId value
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  //new values
  taskSelected.querySelector("h3.task-name").
  textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  //loop through tasks array and task object with new content
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].name = taskType;
    }
  }

  alert("Task Updated!");

  //remove data attribute from form
  formEl.removeAttribute("data-task-id");
  //update formEln button to go back to saying 'Add task' instead of 'Edit task'
  formEl.querySelector("#save-task").textContent = "Add Task";
  saveTasks()
};

var taskButtonHandler = function (event) {
  //get target element from event
  var targetEl = event.target;
  //edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    //get the elements task id
    var taskId = targetEl.getAttribute("data-task-id");
  } else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    //get the elements's task id
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};
var taskStatusChangeHandler = function (event) {
  console.log(event.target.value);

  // find task list item based on event.target's data-task-id attribute
  var taskId = event.target.getAttribute("data-task-id");

  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // convert value to lower case
  var statusValue = event.target.value.toLowerCase();
  console.log(statusValue)

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if(statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if(statusValue === "completed") {
    taskCompletedEl.appendChild(taskSelected);
  }
  //update task's in tasks array
  for(var i = 0; i < tasks.length; i++) {
    if(tasks[i].id === parseInt(taskId)) {
      tasks[i].statusValue;
    }
  }

  saveTasks();
};


var editTask = function (taskId) {
  console.log(taskId);

  //get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='"
    + taskId + "']");

  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  // write values of taskname and taskType to form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  //form attributeto the form with a value of the task's id so it knows which one is being edited
  formEl.setAttribute("data-task-id", taskId);
  //update button to refelct editing a task rather than creating a new one
  formEl.querySelector("#save-task").
    textContent = "Save Task";
};

var deleteTask = function (taskId) {
  console.log(taskId);
  // find task list element with taskId value and remove it
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();

  //create new array to hold updated list of tasks
  var updatedTaskArr = []

  //loop through current tasks
  for(var i = 0; i <tasks.length; i++) {
    //if tasks [i].id doesn't match the value of taskId, lets keep that task and push it to a new array
    if(tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
  //reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;
  saveTasks();
};

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
var loadTasks = function() {
  var savedTasks = localStorage.getItem("tasks");

  if(!savedTasks) {
    return false;
  }
  console.log("Saved tasks found!")

  savedTasks = JSON.parse(savedTasks);

  //loop through savesTasks array
  for (var i = 0; i < savedTasks.length; i++) {
    //pas each task object into the 'createTaskEl() function
    createTaskEl(savedTasks[i]);
  }
};

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();