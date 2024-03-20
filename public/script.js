const button = document.querySelector(".button");
const inputBox = document.querySelector(".input-box");
const listContainer = document.querySelector(".list-container");

async function fetchTasks() {
  try {
    inputBox.focus();
    const response = await fetch('/api/v1/tasks/todo');
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

function renderTasks(tasks){
  listContainer.innerHTML = ""; // Clear previous content
  tasks.forEach(task =>{
    // Create a div for each task
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-div");

    // Create an li element for the task text
    const listItem = document.createElement('li');
    listItem.textContent = task.title;
    listItem.dataset.id = task._id;
    if(task.status === '1'){
      listItem.style.textDecoration = 'line-through';
      taskDiv.style.backgroundColor = "rgb(7 104 11 / 44%)";
    }
    // Create a div for buttons
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");

    // Append li and button div to task div
    taskDiv.appendChild(listItem);
    taskDiv.appendChild(buttonDiv);

    // Append task div to list container
    listContainer.appendChild(taskDiv);

    // Create buttons and append them to button div
    createEditButton(buttonDiv, taskDiv, listItem);
    createCheckButton(buttonDiv, listItem);
    createDeleteButton(buttonDiv, listItem);
  });
}

function createEditButton(buttonDiv, taskDiv, listItem) {
  const editButton = document.createElement("button");
  editButton.innerHTML = "&#9998;";
  editButton.className = "edit";
  buttonDiv.appendChild(editButton);

  editButton.addEventListener("click", () => {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = listItem.textContent;
    
    listItem.textContent = "";
    listItem.appendChild(editInput);
    editInput.focus();

    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const newTitle = editInput.value;
        if (newTitle) {
          const id = listItem.dataset.id;
          updateTaskTitle(id, newTitle);
        } else {
          listItem.textContent = editInput.defaultValue;
          fetchTasks();
        }
      }
    });
    editInput.addEventListener("blur", (e) => {
      const newTitle = editInput.value;
      if (newTitle) {
        const id = listItem.dataset.id;
        updateTaskTitle(id, newTitle);
      } else {
        listItem.textContent = editInput.defaultValue;
        fetchTasks();
      }
    });
  });
}

function createCheckButton(buttonDiv, listItem) {
  const checkButton = document.createElement("input");
  checkButton.type = "checkbox";
  checkButton.className = "check";
  buttonDiv.appendChild(checkButton);
  if(listItem.style.textDecoration == 'line-through'){
  checkButton.checked = true;
  }

  checkButton.addEventListener("click", () => {
    const id = listItem.dataset.id;
    const status = listItem.style.textDecoration === 'line-through' ? "0" : "1";
    updateTaskStatus(id, status);
  });
}

function createDeleteButton(buttonDiv, listItem) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "\u00d7";
  deleteButton.className = "delete";
  buttonDiv.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    const id = listItem.dataset.id;
    deleteTask(id);
  });
}

async function updateTaskTitle(id, newTitle) {
  try {
    const response = await fetch('/api/v1/updatetask', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, title: newTitle })
    });
    if (!response.ok) {
      console.error("Failed to update task title:", response.statusText);
    } else {
      fetchTasks();
    }
  } catch (error) {
    console.error('Error updating task title:', error);
  }
}

async function updateTaskStatus(id, status){
  try{
    const response = await fetch('/api/v1/updatestatus',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({id,status})
    })
    if(!response.ok){
      console.error("failed to update task status", response.statusText);
    }
    else{
      fetchTasks();
    }
  }
  catch(error){
    console.error("error updating task status", error)
  }
}

async function deleteTask (id){
  try{
    const response = await fetch ('/api/v1/deletetask',{
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    })
    if(!response.ok){
      console.error("failed to delete the task",response.statusText);
    }
    else{
      fetchTasks();
    }
  }
  catch(error){
    console.error("error deleting the task", error)
  }
}

button.addEventListener("click", () => {
  const title = inputBox.value;
  if (title === "") {
    alert("You must write something!");
  } else {
    addTask(title);
    inputBox.value = "";
  }
});

inputBox.addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    const title = inputBox.value;
    if (title === "") {
      alert("You must write something!");
    } else {
      addTask(title);
      inputBox.value = "";
    }
  }
});

async function addTask(title) {
  try {
    const response = await fetch('/api/v1/addtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title : title,
        status: "0"
      })
    });
    if (response.ok) {
      fetchTasks();
    } else {
      console.error('Failed to add task:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

document.addEventListener("DOMContentLoaded", fetchTasks);