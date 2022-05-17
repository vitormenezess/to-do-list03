const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksConatiner = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  if (!validateInput()) {
    return inputElement.classList.add("error");
  }
  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener("click", () => handleClick(taskContent));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far");
  deleteItem.classList.add("fa-trash-alt");
  deleteItem.classList.add("delete-task-button");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  tasksConatiner.appendChild(taskItemContainer);

  inputElement.value = "";

  upadateLacalStorage();
};
function handleClick(taskContent) {
  const tasks = tasksConatiner.childNodes;
  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("checked");
    }
  }
  upadateLacalStorage();
}
handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksConatiner.childNodes;
  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }
  upadateLacalStorage();
};

const handleInputChange = () => {
  if (validateInput()) {
    return inputElement.classList.remove("error");
  }
};

const upadateLacalStorage = () => {
  const tasks = tasksConatiner.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isChecked = content.classList.contains("checked");

    return { description: content.innerText, isChecked };
  });
  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};
const refreshLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if(!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;
    if (task.isChecked) {
      taskContent.classList.add("checked");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");
    deleteItem.classList.add("delete-task-button");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksConatiner.appendChild(taskItemContainer);
  }
};
refreshLocalStorage();

addTaskButton.addEventListener("click", handleAddTask);
inputElement.addEventListener("change", handleInputChange);
