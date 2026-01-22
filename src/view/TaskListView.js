export class TaskListView {
  #containerElement;
  #toggleCallback;
  #deleteCallback;
  #editCallback;

  constructor(containerSelector) {
    this.#containerElement = document.querySelector(containerSelector);

    if (!this.#containerElement) {
      throw new Error("Élément de conteneur non trouvé");
    }
  }

  onToggle(callback) {
    this.#toggleCallback = callback;
  }

  onDelete(callback) {
    this.#deleteCallback = callback;
  }

  onEdit(callback) {
    this.#editCallback = callback;
  }

  render(tasks) {
    this.#containerElement.innerHTML = "";

    if (tasks.length === 0) {
      this.#renderEmptyState();
      return;
    }

    // ? Méthode 1 (moins efficace)
    // tasks.forEach((task) => {
    //   const taskItem = this.#createTaskElement(task);
    //   this.#containerElement.appendChild(taskItem);
    // });

    // ? Méthode 2 (plus optimisée)
    const elements = tasks.map((task) => {
      return this.#createTaskElement(task);
    });
    this.#containerElement.append(...elements);
  }

  #renderEmptyState() {
    const emptyStateElement = document.createElement("li");
    emptyStateElement.classList.add("empty-state");

    const emptyStateTitle = document.createElement("p");
    emptyStateTitle.textContent = "Aucune tâche pour le moment.";

    const emptyStateDescription = document.createElement("p");
    emptyStateDescription.textContent = "Ajoutez une tâche pour commencer.";
    emptyStateDescription.classList.add("hint");

    emptyStateElement.append(emptyStateTitle, emptyStateDescription);
    this.#containerElement.appendChild(emptyStateElement);
  }

  #createTaskElement(task) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task");

    // ? Création de l'élément de toggle (checkbox)
    const taskToggleElement = document.createElement("input");
    taskToggleElement.setAttribute("type", "checkbox");
    // * OU taskToggleElement.type = "checkbox"
    taskToggleElement.classList.add("task-toggle");
    taskToggleElement.addEventListener("change", () => {
      if (typeof this.#toggleCallback === "function") {
        this.#toggleCallback(task.id);
      }
    });

    // ? Création de l'élément de titre
    const taskTitleElement = document.createElement("p");
    taskTitleElement.classList.add("task-title");
    taskTitleElement.textContent = task.title;
    taskTitleElement.dataset.taskId = task.id;

    // ? Groupement des boutons (UI)
    const taskActionsElement = document.createElement("div");
    taskActionsElement.classList.add("task-actions");

    // ? Bouton éditer
    const taskEditElement = document.createElement("button");
    taskEditElement.textContent = "Éditer";
    taskEditElement.classList.add("button", "button--primary");
    taskEditElement.setAttribute("type", "button");
    taskEditElement.addEventListener("click", () => {
      if (typeof this.#editCallback === "function") {
        this.#editCallback(task.id, task.title);
      }
    });

    // ? Bouton supprimer
    const taskDeleteElement = document.createElement("button");
    taskDeleteElement.textContent = "Supprimer";
    taskDeleteElement.classList.add("button", "button--danger");
    taskDeleteElement.setAttribute("type", "button");
    taskDeleteElement.addEventListener("click", () => {
      if (typeof this.#deleteCallback === "function") {
        this.#deleteCallback(task.id, task.title);
      }
    });

    // ? Insertion des boutons dans le groupement de boutons
    taskActionsElement.append(taskEditElement, taskDeleteElement);

    // ? Insertion des éléments de la tâche dans le conteneur li de la tâche
    taskElement.append(taskTitleElement, taskToggleElement, taskActionsElement);

    // ? On retourne l'élément HTML tout juste préparé
    return taskElement;
  }
}
