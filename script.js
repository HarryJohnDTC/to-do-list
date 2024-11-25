let taskContainer = document.getElementById("task");
let addButton = document.getElementById("add");
let taskInput = document.getElementById("taskInput");
let taskToUpdate = null;

// Ajouter une tâche
addButton.onclick = function () {
    let taskText = taskInput.value.trim();

    if (taskText !== "") {
        if (taskToUpdate) {
            // Mise à jour de la tâche existante
            enableDeleteUpdate();
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
    disableDeleteUpdate(); // Désactive les boutons "Update" et "Delete" sur toutes les tâches
}

// (cocher ou décocher)
taskContainer.addEventListener("change", function (e) {
    if (e.target && e.target.classList.contains("task-checkbox")) {
        let taskElement = e.target.parentElement;
        taskElement.classList.toggle("checked", e.target.checked);
    }
});

// Désactiver les boutons "Update" et "Delete"
function disableDeleteUpdate() {
    let buttons = taskContainer.querySelectorAll(".update, .delete");
    for (let button of buttons) {
        button.disabled = true;
        button.classList.add("disable");
    }
}

// Activer les boutons "Update" et "Delete"
function enableDeleteUpdate() {
    let buttons = taskContainer.querySelectorAll(".update, .delete");
    for (let button of buttons) {
        button.disabled = false;
        button.classList.remove("disable");
    }
}
