const todoData = [
  {
    id: 1,
    title: "todo 1",
    completed: false
  },
  {
    id: 2,
    title: "todo 2",
    completed: false
  },
];
const itemTemplate = document.querySelector("#todo-item-template");
const todoList = document.querySelector("#todos");
let todoCount = 2; 

function main() {
  setupEventListeners();
  todoData.forEach((todo) => renderTodo(todo));
}

function setupEventListeners() {
  const todoInput = document.querySelector("#todo-input");
  const addTodoButton = document.querySelector("#todo-add");
  addTodoButton.addEventListener("click", () => {
    const title = todoInput.value;
    if (!title) {
      alert("Please enter a todo title!");
      return;
    }
    const todo = createTodo(title);
    renderTodo(todo);
    todoData.push(todo);
    
    todoInput.value = "";

    updateTodoCount(1);
  });

  
  const toggleAllButton = document.querySelector("#toggle-all");
  toggleAllButton.addEventListener("click", () => {
    toggleAllTodos();
  });

  const clearCompletedButton = document.querySelector("#clear-completed");
  clearCompletedButton.addEventListener("click", () => {
    clearCompletedTodos();
  })
}

function renderTodo(todo) {
  const item = createTodoElement(todo);
  todoList.appendChild(item);
}

function createTodoElement(todo) {
  const item = itemTemplate.content.cloneNode(true);
  const container = item.querySelector(".todo-item");
  container.id = todo.id;
  console.log(todo);
  const checkbox = item.querySelector(`input[type="checkbox"]`);
  checkbox.checked = todo.completed;
  checkbox.dataset.id = todo.id;
  checkbox.addEventListener("change", () => {
    updateTodoElementStatus(todo.id);
  });
  const title = item.querySelector("p.todo-title");
  title.innerText = todo.title;
  const deleteButton = item.querySelector("button.delete-todo");
  deleteButton.dataset.id = todo.id;
  deleteButton.addEventListener("click", () => {
    deleteTodoElement(todo.id);
  });
  return item;
}
  

function deleteTodoElement(id) {
  const todoElement = document.getElementById(String(id));
  const checkbox = todoElement.querySelector(`input[type="checkbox"]`);
  checkbox.checked ? null : updateTodoCount(-1);
  todoElement.remove();

  const todo = todoData.find((todo) => todo.id === id);
  todoData.splice(todoData.indexOf(todo), 1);
}

function updateTodoElementStatus(id) {
  const todoElement = document.getElementById(String(id));
  const checkbox = todoElement.querySelector('input[type="checkbox"]');
  checkbox.checked ? updateTodoCount(-1) : updateTodoCount(1);

  const todo = todoData.find((todo) => todo.id === id);
  todo.completed = checkbox.checked;
}

function createTodo(title) {
  const newTodo = {
    id: Math.floor(Math.random() * 1000),
    title: title,
    completed: false,
  };
  return newTodo;
}

function updateTodoCount(increment) {
  todoCount += increment;
  const countElement = document.querySelector("#todos-count");
  countElement.innerHTML = `${todoCount} incomplete todos`;
}

function toggleAllTodos() {
  todoData.forEach((todo) => {
    if (!todo.completed){
      const todoElement = document.getElementById(String(todo.id));
      const checkbox = todoElement.querySelector(`input[type="checkbox"]`);
      checkbox.checked = true;
      updateTodoElementStatus(todo.id);
      todo.completed = true;
    }
  });
}

function clearCompletedTodos() {
  const completedTodos = todoData.filter((todo) => todo.completed);
  if (completedTodos.length === 0) return;
  completedTodos.forEach((todo) => {
    deleteTodoElement(todo.id);
  })
}

main();
