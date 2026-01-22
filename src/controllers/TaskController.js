import { TaskManager } from "../managers/TaskManager";
import { TaskFormView } from "../view/TaskFormView";
import { TaskListView } from "../view/TaskListView";

export class TaskController {
  #manager;
  #views;

  constructor() {
    this.#manager = new TaskManager();

    this.#views = {
      form: new TaskFormView("#task-form", "#task-input"),
      list: new TaskListView("#task-list"),
    };

    this.#init();
  }

  #init() {
    this.#manager.on("task:added", (data) => {
      console.log(`Tâche ajoutée : ${data.task.title}`);
    });

    // ? Dès que la colleciton stockée dans le manager des taches
    // ? change, on réçoit cet événement...
    this.#manager.on("tasks:changed", (data) => {
      // ? ... et on met à jour toutes les vues,
      // ? avec les nouvelles données (tâches).
      this.#updateAllViews(data.tasks);
    });

    this.#views.form.onSubmit((title) => this.#handleAddTask(title));

    this.#updateAllViews();
  }

  #handleAddTask(title) {
    try {
      this.#manager.add(title);
    } catch (error) {
      console.error(error);
    }
  }

  #updateAllViews(tasks = this.#manager.getAllToJSON()) {
    this.#views.list.render(tasks);
  }
}
