const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

const STORAGE_KEY = "todo-app:todos";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    return;
  }

  addTodo(text);
  saveTodos();
  input.value = "";
  input.focus();
});

function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return;
  }

  let todos;
  try {
    todos = JSON.parse(raw);
  } catch {
    return;
  }

  if (!Array.isArray(todos)) {
    return;
  }

  todos.forEach(({ text, completed }) => addTodo(text, completed));
}

function saveTodos() {
  const todos = [...list.children].map((item) => ({
    text: item.querySelector(".todo-text").textContent,
    completed: item.classList.contains("completed"),
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function addTodo(text, completed = false) {
  const item = document.createElement("li");
  item.className = "todo-item";
  item.classList.toggle("completed", completed);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    item.classList.toggle("completed", checkbox.checked);
    saveTodos();
  });

  const label = document.createElement("span");
  label.className = "todo-text";
  label.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "todo-delete";
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", () => {
    item.remove();
    saveTodos();
  });

  item.append(checkbox, label, deleteButton);
  list.appendChild(item);
}

loadTodos();
