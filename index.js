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

  static handlerAddTask() {
    const formTitleValues = TaskManager.getTaskTitle(),
      formDescriptionValues = TaskManager.getTaskDescription(),
      newTask = new Task(
        formTitleValues.title,
        formDescriptionValues.description
      );

    if (TaskManager.isValidTask(newTask)) {
      TaskManager.addTaskDOM(newTask);
    }
  }
}

document.getElementById("addTaskBtn").addEventListener("click", () => {
  TaskManager.handlerAddTask();
});
