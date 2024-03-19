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
  listContainer.innerHTML = " ";
  tasks.forEach(task =>{
    const listItem = document.createElement('li');
    listItem.textContent = task.title;
    listItem.dataset.id = task._id;
    if(task.status === '1'){
      listItem.style.textDecoration = 'line-through';
      listItem.style.backgroundColor = "green";
    }
    createCrossAndCheckBox(listItem);
    createEditButton(listItem);
    listContainer.append(listItem);
  })
}

function createCrossAndCheckBox(listItem){
  const cross = document.createElement("span");
  cross.innerHTML = "\u00d7";
  cross.className = "close";
  listItem.append(cross);

  const checkBox = document.createElement("input");
  checkBox.className = "checked";
  checkBox.type = "checkbox";
  listItem.append(checkBox);

  if(listItem.style.textDecoration === 'line-through'){
    checkBox.checked = true;
  }

  cross.addEventListener("click",removeTask);
  function removeTask(){
    const id = listItem.dataset.id;
    deleteTask(id);
  }

  checkBox.addEventListener("change",checkedOrUnchecked);
  async function checkedOrUnchecked(event){ 
    const id = listItem.dataset.id;
    const status = event.target.checked ? "1" : "0";
    try{
      await updateTaskStatus(id,status);
    }
    catch(error){
      console.error("error updating task status:", error);
    }
  }
}

function createEditButton(listItem) {
  const editButton = document.createElement("span");
  editButton.innerHTML = "&#9998;";
  editButton.className = "edit";
  listItem.append(editButton);

  editButton.addEventListener("click", () => {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = listItem.textContent.substring(0,(listItem.textContent.length)-2);
    
    listItem.textContent = "";
    listItem.append(editInput);
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


async function updateTaskStatus(id,status){
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