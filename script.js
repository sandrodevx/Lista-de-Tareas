// script.js - Lógica de la Lista de Tareas

// Seleccionamos los elementos del DOM que vamos a usar
const taskInput = document.getElementById("task"); // Campo de texto para ingresar tareas
const addTaskButton = document.getElementById("addTask"); // Botón para agregar tareas
const taskList = document.getElementById("taskList"); // Lista donde se mostrarán las tareas

// Cargar tareas desde localStorage cuando se inicie la página
window.addEventListener("load", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
});

// Función para agregar una tarea
function addTask() {
    const taskText = taskInput.value.trim(); // Obtiene el texto del input y elimina espacios extra
    if (taskText === "") return; // Si el input está vacío, no hace nada

    addTaskToDOM(taskText, false); // Agrega la tarea a la lista visualmente
    saveTasks(); // Guarda las tareas en localStorage
    taskInput.value = ""; // Limpia el input después de agregar la tarea
}

// Función para agregar una tarea a la lista en el DOM
function addTaskToDOM(text, completed) {
    const li = document.createElement("li"); // Crea un nuevo elemento de lista
    
    const span = document.createElement("span"); // Elemento para el texto de la tarea
    span.textContent = text;
    if (completed) span.style.textDecoration = "line-through"; // Si la tarea está completada, la tachamos

    // Botón para marcar como completado
    const completeButton = document.createElement("button");
    completeButton.textContent = "✔";
    completeButton.addEventListener("click", () => {
        span.style.textDecoration = span.style.textDecoration ? "" : "line-through";
        saveTasks();
    });

    // Botón para eliminar la tarea
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
        li.remove(); // Elimina la tarea del DOM
        saveTasks(); // Guarda cambios en localStorage
    });

    // Agregamos los elementos al li y luego al ul
    li.appendChild(span);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Función para guardar las tareas en localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.firstChild.style.textDecoration === "line-through"
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Guarda el array en localStorage
}

// Event Listener para agregar tareas al hacer clic en el botón
addTaskButton.addEventListener("click", addTask);

// Event Listener para agregar tareas con la tecla Enter
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
