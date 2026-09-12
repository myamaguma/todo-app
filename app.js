const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const dueDateInput = document.getElementById("todo-due-date");
const list = document.getElementById("todo-list");

const STORAGE_KEY = "todo-app:todos";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    return;
  }

  addTodo(text, false, dueDateInput.value);
  saveTodos();
  input.value = "";
  dueDateInput.value = "";
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

  todos.forEach(({ text, completed, dueDate }) => addTodo(text, completed, dueDate));
}

function saveTodos() {
  const todos = [...list.children].map((item) => ({
    text: item.querySelector(".todo-text").textContent,
    completed: item.classList.contains("completed"),
    dueDate: item.dataset.dueDate || "",
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function isOverdue(dueDate, completed) {
  if (!dueDate || completed) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
}

function addTodo(text, completed = false, dueDate = "") {
  const item = document.createElement("li");
  item.className = "todo-item";
  item.classList.toggle("completed", completed);
  item.dataset.dueDate = dueDate;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    item.classList.toggle("completed", checkbox.checked);
    dueDateLabel.classList.toggle("overdue", isOverdue(item.dataset.dueDate, checkbox.checked));
    saveTodos();
  });

  const label = document.createElement("span");
  label.className = "todo-text";
  label.textContent = text;

  const dueDateLabel = document.createElement("span");
  dueDateLabel.className = "todo-due-date";
  if (dueDate) {
    dueDateLabel.textContent = dueDate;
    dueDateLabel.classList.toggle("overdue", isOverdue(dueDate, completed));
  }

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "todo-delete";
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", () => {
    item.remove();
    saveTodos();
  });

  item.append(checkbox, label, dueDateLabel, deleteButton);
  list.appendChild(item);
}

loadTodos();
