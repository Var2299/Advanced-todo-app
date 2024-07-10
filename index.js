document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    console.log("Stored tasks from localStorage:", storedTasks); // Debug
    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTaskInput();
        updateStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks saved to localStorage:", tasks); // Debug
};

const addTask = () => {
    const taskInput = document.getElementById("taskinput");
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateTaskInput();
        updateStats();
        saveTasks(); // Save tasks after adding
    }
};

const Toggletask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskInput();
    updateStats();
    saveTasks(); // Save tasks after toggling
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskInput();
    updateStats();
    saveTasks(); // Save tasks after deleting
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskinput");
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTaskInput();
    updateStats();
    saveTasks(); // Save tasks after editing
};

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    document.getElementById("numbers").innerText = `${completedTasks}/${totalTasks}`;
    if (tasks.length && completedTasks === totalTasks) {
        blastConfetti();
    }
};

const updateTaskInput = () => {
    const tasklist = document.getElementById("task-list");
    tasklist.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onclick="editTask(${index})">
                    <img src="./img/bin.png" onclick="deleteTask(${index})">
                </div>
            </div>
        `;
        listItem.addEventListener("change", () => Toggletask(index));
        tasklist.append(listItem);
    });
};

document.getElementById("newtask").addEventListener("click", function(e) {
    e.preventDefault();
    addTask();
});

const blastConfetti = ()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}