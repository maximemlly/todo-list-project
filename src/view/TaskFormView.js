export class TaskFormView {
  #formElement;
  #inputElement;
  #sumbitCallback;

  constructor(formSelector, inputSelector) {
    this.#formElement = document.querySelector(formSelector);
    this.#inputElement = document.querySelector(inputSelector);

    if (!this.#formElement || !this.#inputElement) {
      throw new Error("Formulaire ou champ de saisie non trouvé");
    }

    this.#setupEventListeners();
  }

  #setupEventListeners() {
    this.#formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = this.getTitle();

      if (typeof this.#sumbitCallback === "function") {
        this.#sumbitCallback(title);
        this.clear();
      }
    });
  }

  onSubmit(callback) {
    this.#sumbitCallback = callback;
  }

  getTitle() {
    return this.#inputElement.value.trim();
  }

  clear() {
    this.#inputElement.value = "";
    this.#inputElement.focus();
  }
}
