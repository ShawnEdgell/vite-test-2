import { createElementWithClass } from './domUtils';
import { saveTodos } from './storage';

export function createTodoElement(task) {
    const listItem = createElementWithClass("li", "list-group-item", "d-flex", "justify-content-between", "align-items-center", "task");
    
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

    // Listen for the blur event to save changes when the user clicks away
    const todoLabel = listItem.querySelector(".todo-label");
    todoLabel.addEventListener("blur", function () {
        task.text = todoLabel.textContent;
        saveTodos();
    });

    // Finish editing by pressing Enter
    todoLabel.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();  // Prevents a newline
            todoLabel.blur();
        }
    });

    // Delete task when the delete button is clicked
    const deleteButton = listItem.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
        listItem.remove();
        saveTodos();
    });

    return listItem;
}
