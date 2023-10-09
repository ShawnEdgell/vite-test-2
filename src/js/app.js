import { getElem } from './domUtils';
import { createTodoElement } from './todoUtils';
import { saveTodos, loadTodos } from './storage';
import { initDarkModeToggle } from './darkModeToggle'; 

document.addEventListener("DOMContentLoaded", function () {
    const todoInput = getElem("todoInput");
    const addTodoBtn = getElem("addTodo");
    const todoList = getElem("todoList");
    const priorityInput = getElem("priorityInput");

    function addTask() {
        if (todoInput.value.trim() !== "") {
            const task = {
                id: Date.now(),
                text: todoInput.value.trim(),
                priority: priorityInput.value,
                date: new Date(Date.now()).toLocaleDateString(),
            };

            const listItem = createTodoElement(task);
            todoList.appendChild(listItem);
            
            todoInput.value = "";
            saveTodos(getAllTodosFromDOM());
        }
    }

    addTodoBtn.addEventListener("click", addTask);
    todoInput.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    function getAllTodosFromDOM() {
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
        return todosToSave;
    }

    // Load todos on start
    const savedTodos = loadTodos();
    savedTodos.forEach(todo => {
        const listItem = createTodoElement(todo);
        todoList.appendChild(listItem);
    });

    // Initialize dark mode toggle
    initDarkModeToggle(); // Place it here
});
