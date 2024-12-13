class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }

  createTitleTask() {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.textContent = `${this.title}`;

    return taskItem;
  }

  createDescriptionTask(taskItem) {
    const taskItemDescription = document.createElement("span");
    taskItemDescription.className = "task-description";
    taskItemDescription.textContent = `${this.description}`;
    taskItem.appendChild(taskItemDescription);
  }

  deleteButton(taskItem) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerText = "Удалить";

    deleteButton.addEventListener("click", () => {
      taskItem.remove();
      TaskManager.removeTaskFromLocalStorage(this.id);
    });
    taskItem.appendChild(deleteButton);
  }
}

class TaskManager {
  static getTaskTitle() {
    const taskTitleInput = document.getElementById("taskTitle");
    const taskTitleValue = taskTitleInput.value.trim();

    return { title: taskTitleValue };
  }

  static getTaskDescription() {
    const taskDescriptionInput = document.getElementById("taskDescription");
    const taskDescriptionValue = taskDescriptionInput.value.trim();

    return { description: taskDescriptionValue };
  }

  static isValidTask(task) {
    if (!task.title) {
      alert("Заполните поле Title");
      return false;
    }
    return true;
  }

  static addTaskDOM(task) {
    const taskList = document.getElementById("taskList");
    const taskItem = task.createTitleTask();

    task.createDescriptionTask(taskItem);
    task.deleteButton(taskItem);
    taskList.appendChild(taskItem);
  }

  static LocalStorageSave(task) {
    let tasks = [];
    if (localStorage.getItem("tasks")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    task.id = Date.now();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static removeTaskFromLocalStorage(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  static loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const newTask = new Task(task.title, task.description);
      newTask.id = task.id;
      TaskManager.addTaskDOM(newTask);
    });
  }

  static handlerAddTask() {
    const formTitleValues = TaskManager.getTaskTitle(),
      formDescriptionValues = TaskManager.getTaskDescription(),
      newTask = new Task(
        formTitleValues.title,
        formDescriptionValues.description
      );

    if (TaskManager.isValidTask(newTask)) {
      TaskManager.addTaskDOM(newTask);
      TaskManager.LocalStorageSave(newTask);
    }
  }
}

window.onload = function () {
  TaskManager.loadTasksFromLocalStorage();
};

document.getElementById("addTaskBtn").addEventListener("click", () => {
  TaskManager.handlerAddTask();
});
