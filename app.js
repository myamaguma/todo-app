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
  item.textContent = text;
  list.appendChild(item);
}
