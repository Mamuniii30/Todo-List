let todoList = JSON.parse(localStorage.getItem("todos")) || [];
const todoInput = document.getElementById("todoInput");
const categorySelect = document.getElementById("categorySelect");
const dueDateInput = document.getElementById("dueDate");
const listContainer = document.getElementById("todoList");
const itemCount = document.getElementById("itemCount");
const themeToggle = document.getElementById("themeToggle");

function addTodo() {
  const value = todoInput.value.trim();
  const category = categorySelect.value;
  const dueDate = dueDateInput.value;

  if (value !== "") {
    todoList.push({
      text: value,
      category,
      dueDate,
      done: false,
      notified: false,
    });
    todoInput.value = "";
    dueDateInput.value = "";
    saveAndRender();
  }
}

function renderTodos() {
  listContainer.innerHTML = "";
  todoList.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.done ? "done" : "";

    li.innerHTML = `
      <input type="checkbox" ${todo.done ? "checked" : ""} onchange="toggleDone(${index})" />
      <span ondblclick="editTodo(${index})">${todo.text}</span>
      <button onclick="deleteTodo(${index})">🗑️</button>
    `;
    listContainer.appendChild(li);
  });

  itemCount.textContent = `${todoList.length} item${todoList.length !== 1 ? "s" : ""} total`;
}

function toggleDone(index) {
  todoList[index].done = !todoList[index].done;
  saveAndRender();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveAndRender();
}


function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todoList = [];
    saveAndRender();
  }
}

function editTodo(index) {
  const newTask = prompt("Edit your task:", todoList[index].text);
  if (newTask !== null && newTask.trim() !== "") {
    todoList[index].text = newTask.trim();
    saveAndRender();
  }
}


function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todoList));
  renderTodos();
}


setInterval(() => {
  const now = new Date();
  todoList.forEach((todo, index) => {
    if (
      todo.dueDate &&
      !todo.notified &&
      !todo.done &&
      new Date(todo.dueDate) <= now
    ) {
      alert(`🔔 Reminder: "${todo.text}" is due now!`);
      todoList[index].notified = true;
      saveAndRender();
    }
  });
}, 60000); 

saveAndRender();
