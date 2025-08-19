let themeToggle = document.getElementById("theme-toggle");
let sunSwitch = document.getElementById("sun-switch");
let moonSwitch = document.getElementById("moon-switch");
let inputAnswer = document.querySelector(".answer__input");
let boardCircle = document.querySelector(".board__circle");
let blockCount = document.querySelectorAll(".block");
let boardPreview = document.querySelector(".board__preview");
let template = document.querySelector("#task-template");
let boardSection = document.querySelector(".board");

function updateSwitchIcons() {
  if (!document.body.classList.contains("dark")) {
    sunSwitch.classList.add("visible");
    moonSwitch.classList.remove("visible");
    blockCount.forEach((el) => el.classList.remove("moon-color"));
    inputAnswer.classList.remove("moon-color");
    boardCircle.classList.remove("circle-color");
  } else {
    sunSwitch.classList.remove("visible");
    moonSwitch.classList.add("visible");
    blockCount.forEach((el) => el.classList.add("moon-color"));
    inputAnswer.classList.add("moon-color");
    boardCircle.classList.add("circle-color");
  }
}

updateSwitchIcons();

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  updateSwitchIcons();
});

document
  .querySelector(".answer__btn")
  .addEventListener("click", function (event) {
    const title = inputAnswer.value.trim(); //
    if (!title) {
      inputAnswer.classList.add("error");
      inputAnswer.placeholder = "Задача не может быть пустой!";
      inputAnswer.focus();
      return;
    }
    inputAnswer.value = "";
    boardPreview.classList.add("unvisible");
    let clone = template.content.cloneNode(true);
    let taskTitleInClone = clone.querySelector(".task__title");
    taskTitleInClone.textContent = title;

    let taskTitle = clone.querySelector(".task__title");
    let circle = clone.querySelector(".task__circle");

    circle.addEventListener("click", function () {
      circle.classList.toggle("circle-active");
      taskTitle.classList.toggle("title-active");
      updateAllCounters();
    });
    let basketSvg = clone.querySelectorAll(".basket");

    basketSvg.forEach((e) => {
      e.addEventListener("click", function () {
        e.closest(".task").remove();
        updateAllCounters();
        if (document.querySelectorAll(".task").length === 0) {
          boardPreview.classList.remove("unvisible");
        }
      });
    });

    boardSection.insertBefore(clone, boardSection.firstChild);
    inputAnswer.value = "";

    updateAllCounters();
  });
inputAnswer.addEventListener("input", () => {
  inputAnswer.classList.remove("error");
});

inputAnswer.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".answer__btn").click();
  }
});

function updateAllCounters() {
  let allTasks = document.querySelectorAll(".task").length;
  let completedTasks = document.querySelectorAll(".circle-active").length;
  let inProgressTasks = allTasks - completedTasks;

  let counters = document.querySelectorAll(".block__h");
  counters[0].textContent = allTasks;
  counters[1].textContent = completedTasks;
  counters[2].textContent = inProgressTasks;
}


let taskTitles = document.querySelectorAll(".task__title"); 

if (document.body.classList.contains("dark")) {
  taskTitles.forEach((el) => el.classList.add("moon-color"));
} else {
  taskTitles.forEach((el) => el.classList.remove("moon-color"));
}