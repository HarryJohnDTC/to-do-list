let addButton = document.getElementById("add");
let taskInput = document.getElementById("taskInput");
let taskContainer = document.getElementById("task");

let taskToUpdate = null;

// Ajouter une tâche
addButton.onclick = function () {
    let taskText = taskInput.value.trim();

    if (taskText !== "") {
        if (taskToUpdate) { 
            addButton.innerText = "Add";
            taskToUpdate.querySelector("span").textContent = taskText;
            taskToUpdate = null; 
        } else {
            // Ajout d'une nouvelle tâche
            let taskElement = document.createElement("div");
            taskElement.classList.add("task-item");

            taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox">
                <span>${taskText}</span>
                <div>
                <button class="update" onclick="updateTask(this)">Update</button>
                <button class="delete" onclick="deleteTask(this)">X</button>
                </div>
            `;

            taskContainer.appendChild(taskElement);
        }
        taskInput.value = ""; 
    } else {
        alert("Veuillez saisir une tâche !");
    }
};

// Supprimer une tâche
function deleteTask(button) {
    let taskElement = button.parentElement.parentElement; 
    taskElement.remove();
}

// Mettre à jour une tâche
function updateTask(button) {
    addButton.innerText = "Update";
    taskToUpdate = button.parentElement.parentElement;
    let taskText = taskToUpdate.querySelector("span").textContent;
    taskInput.value = taskText;
}
//check
taskContainer.addEventListener("change", function (e) {
    if (e.target && e.target.classList.contains("task-checkbox")) {
        let taskElement = e.target.parentElement;
        taskElement.classList.toggle("checked", e.target.checked);
    }
});