import { EventEmitter } from "../utils/EventEmitter";
import { Task } from "../models/Task";

export class TaskManager extends EventEmitter {
  #tasks;

  constructor() {
    super();
    this.#tasks = [];
  }

  // ? CREATE
  add(taskTitle) {
    const newTask = new TaskManager(taskTitle);
    this.#tasks.push(newTask);
    this.emit("task:added", { task: newTask });
    this.emit("tasks:changed", { task: [] });

    return newTask;
  }

  remove(taskId) {
    const taskToDelete = this.getById(taskId);

    if (taskToDelete) {
      this.#tasks = this.#tasks.filter((task) => task.id !== taskId);
      this.emit("task:removed", { task: taskToDelete });
      this.emit("tasks:changed", { tasks: this.getAllToJSON() });

      return true;
    }

    return false;
  }

  toggle(taskId) {
    const taskToToggle = this.getById(taskId);

    if (taskToToggle) {
      taskToToggle.toggle();
      this.emit("task:toggled", { task: taskToToggle });
      this.emit("tasks:changed", { tasks: this.getAllToJSON() });

      return true;
    }

    return false;
  }

  update(taksId, newTitle) {
    const taskToUpdate = this.getById(taksId);

    if (taskToUpdate) {
      taskToUpdate.updateTitle(newTitle);
      this.emit("task:updated", { task: taskToUpdate });
      this.emit("tasks:changed", { tasks: this.getAllToJSON() });

      return true;
    }

    return false;
  }

  getAllToJSON() {
    return this.#tasks.map((task) => task.toJSON());
  }

  loadFromJSON(tasksData) {
    this.#tasks = tasksData.map((jsonTask) => Task.fromJSON(jsonTask));
    this.emit("tasks:loaded", { tasks: this.getAllToJSON() });
    this.emit("tasks:changed", { tasks: this.getAllToJSON() });
  }

  getById(taskId) {
    return this.#tasks.find((task) => task.id === taskId);
  }
}
