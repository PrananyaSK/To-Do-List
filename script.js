// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-text">${taskText} <span class="task-time">(${timeString})</span></span>
                <div class="action-buttons">
                    <button class="complete-button"><i class="fas fa-check"></i></button>
                    <button class="delete-button"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;

            taskList.appendChild(li);
            taskInput.value = '';

            const completeButton = li.querySelector('.complete-button');
            const deleteButton = li.querySelector('.delete-button');

            completeButton.addEventListener('click', () => {
                li.classList.toggle('completed');
                updateProgress();
            });
            deleteButton.addEventListener('click', () => {
                li.remove();
                updateProgress();
            });
            updateProgress();
        }
    }

    function updateProgress() {
        const tasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('li.completed').length;
        const percentage = tasks === 0 ? 0 : (completedTasks / tasks) * 100;

        progressBar.style.width = `${percentage}%`;
        progressPercent.textContent = `${Math.round(percentage)}%`;
    }
});