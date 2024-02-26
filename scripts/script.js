document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span>${taskText}</span>
            <button onclick="deleteTask(this)">Delete</button>
            <input type="checkbox" onchange="checkTask(this)">
        `;

        taskList.appendChild(newTask);
        saveTasks();
        taskInput.value = '';
    }
}

function deleteTask(button) {
    const taskList = document.getElementById('taskList');
    const taskItem = button.parentElement;
    taskList.removeChild(taskItem);
    saveTasks();
}

function checkTask(checkbox) {
    const taskItem = checkbox.parentElement;
    taskItem.classList.toggle('completed');
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    for (const taskItem of taskList.children) {
        const taskText = taskItem.querySelector('span').innerText;
        const isCompleted = taskItem.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        for (const task of tasks) {
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <span>${task.text}</span>
                <button onclick="deleteTask(this)">Delete</button>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="checkTask(this)">
            `;
            if (task.completed) {
                newTask.classList.add('completed');
            }

            taskList.appendChild(newTask);
        }
    }
}
