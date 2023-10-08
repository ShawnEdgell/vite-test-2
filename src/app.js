document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodo");
  const todoList = document.getElementById("todoList");
  const priorityInput = document.getElementById("priorityInput");

  loadTodos();

  function addTask() {
    if (todoInput.value.trim() !== "") {
      addTodo({
        id: Date.now(),
        text: todoInput.value.trim(),
        priority: priorityInput.value,
        date: new Date(Date.now()).toLocaleDateString(),
      });
      todoInput.value = "";
      saveTodos();
    }
  }

  addTodoBtn.addEventListener("click", addTask);

  todoInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  function addTodo(task) {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "task"
    );
    switch (task.priority) {
      case "high":
        listItem.classList.add("priority-high");
        break;
      case "medium":
        listItem.classList.add("priority-medium");
        break;
      case "low":
        listItem.classList.add("priority-low");
        break;
    }
    listItem.setAttribute("data-id", task.id);
    listItem.innerHTML = `
      <div class="d-flex align-items-center w-100">
        <span class="todo-label flex-grow-1" contenteditable="true">${task.text}</span>
        <div class="d-flex align-items-center">
          <small>${task.date}</small>
          <button class="btn btn-danger btn-sm ml-1 delete-btn">X</button>
        </div>
      </div>`;
    todoList.appendChild(listItem);

    // Listen for the blur event to save changes when the user clicks away
    const todoLabel = listItem.querySelector(".todo-label");
    todoLabel.addEventListener("blur", function () {
      task.text = todoLabel.textContent;
      saveTodos();
    });

    // Finish editing by pressing Enter
    todoLabel.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        todoLabel.blur();
      }
    });

    // Delete task when the delete button is clicked
    const deleteButton = listItem.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
      listItem.remove();
      saveTodos();
    });
  }

  function saveTodos() {
    const todosToSave = [];
    Array.from(todoList.children).forEach((li) => {
      let priority;
      if (li.classList.contains("priority-high")) priority = "high";
      else if (li.classList.contains("priority-medium")) priority = "medium";
      else if (li.classList.contains("priority-low")) priority = "low";

      todosToSave.push({
        id: li.getAttribute("data-id"),
        text: li.querySelector(".todo-label").textContent,
        date: li.querySelector("small").textContent,
        priority: priority,
      });
    });
    localStorage.setItem("todos", JSON.stringify(todosToSave));
  }

  function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      savedTodos.forEach((todo) => addTodo(todo));
    }
  }
});
