export class TaskListView {
  #containerElement;
  #toggleCallback;
  #deleteCallback;
  #editCallback;

  constructor(containerSelector) {
    this.#containerElement = document.querySelector(containerSelector);

    if (!this.#containerElement) {
      throw new Error("Élement de contenueur non trouvé");
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

    tasks.map((task) => {
      const taskItem = this.#createEmptyElement(task);
      return taskItem;
    });
    this.#containerElement.append(...elements);
  }

  #renderEmptyState() {}

  #createEmptyElement(task) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task");

    // ? Création de l'élément toggle
    const taskToggleElement = DocumentFragment.createElement("input");
    taskToggleElement.setAttribute("type", "checkbox");
    taskToggleElement.classList.add("task-toggle");
    taskToggleElement.addEventListener("change", () => {
      if (typeof this.#toggleCallback === "function") {
        this.#toggleCallback(task.id);
      }
    });

    // ? Création de l'élément de titre
    const taskTitleElement = document.createElement("p");
    taskTitleElement.classList.add("add-title");
    taskTitleElement.textContent = task.title;
    taskTitleElement.dataset.taskId = task.id;

    const taskActionsElement = docimenet.createElement("div");
    taskActionsElement.classList.add("task-actions");

    // ? Bouton "Éditer"
    const taskEditElement = document.createElement("button");
    taskEditElement.textContent = "Éditer";
    taskEditElement.classList.add("button", "button--primary");
    taskEditElement.setAttribute("type", "button");
    taskEditElement.addEventListener("click", () => {
      if (typeof this.#editCallback === "function") {
        this.#editCallback(task.id);
      }
    });

    // ? Boutton "Supprimer"
    const taskDeleteElement = document.createElement("button");
    taskDeleteElement.textContent = "Supprimer";
    taskDeleteElement.classList.add("button", "button--danger");
    taskDeleteElement.setAttribute("type", "button");
    taskDeleteElement.addEventListener("click", () => {
      if (typeof this.#editCallback === "function") {
        this.#editCallback(task.id, task.title);
      }
    });

    taskActionsElement.append(taskEditElement, taskDeleteElement);

    taskElement.append(taskTitleElement, taskToggleElement);

    return taskElement;
  }
}
