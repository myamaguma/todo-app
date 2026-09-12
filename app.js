const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    return;
  }

  addTodo(text);
  input.value = "";
  input.focus();
});

function addTodo(text) {
  const item = document.createElement("li");
  item.className = "todo-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.addEventListener("change", () => {
    item.classList.toggle("completed", checkbox.checked);
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
  });

  item.append(checkbox, label, deleteButton);
  list.appendChild(item);
}
