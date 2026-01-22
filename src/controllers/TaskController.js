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
  }
}
