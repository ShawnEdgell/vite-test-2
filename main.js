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
        <span class="todo-label flex-grow-1">${task.text}</span>
        <div class="d-flex align-items-center ml-auto"> <!-- Use ml-auto to push content to the right -->
          <small>${task.date}</small>
          <button class="btn btn-primary btn-sm ml-1 edit-btn">Edit</button>
          <button class="btn btn-danger btn-sm ml-1 delete-btn">X</button>
        </div>
      </div>`;
    todoList.appendChild(listItem);
  }

  todoList.addEventListener("click", function (e) {
    const taskElement = e.target.closest(".task");
    if (taskElement) {
      if (e.target.classList.contains("delete-btn")) {
        taskElement.remove();
        saveTodos();
      }

      if (e.target.classList.contains("edit-btn")) {
        const label = taskElement.querySelector(".todo-label");
        const editInput = document.createElement("input");
        editInput.classList.add("form-control");
        editInput.value = label.textContent;
        const editButton = e.target;

        if (editButton.textContent === "Edit") {
          label.classList.add("d-none");
          label.style.maxWidth = "none";
          editInput.style.width = "100%";
          editInput.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
              label.textContent = editInput.value;
              label.classList.remove("d-none");
              label.style.maxWidth = "calc(100% - 90px)";
              editInput.remove();
              editButton.textContent = "Edit";
              saveTodos();
            }
          });

          taskElement.insertBefore(editInput, taskElement.childNodes[0]);
          editInput.focus();
          editButton.textContent = "Save";
        }
      }
    }
  });

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
