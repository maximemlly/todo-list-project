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

    const taskToggleElement = DocumentFragment.createElement("input");
    taskToggleElement.setAttribute("type", "checkbox");

    const taskTitleElement = document.createElement("p");
    taskTitleElement.classList.add("add-title");
    taskTitleElement.textContent = task.title;
    taskTitleElement.dataset.taskId = task.id;

    const taskEditElement = document.createElement("button");
    const taskDeleteElement = document.createElement("button");

    return taskElement;
  }
}
