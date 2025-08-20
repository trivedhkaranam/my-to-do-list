const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const noTasksMessage = document.getElementById('no-tasks-message');

let tasks = JSON.parse(localStorage.getItem('todos')) || [];


function saveTasks() {
    localStorage.setItem('todos', JSON.stringify(tasks));
}


function renderTasks() {
    taskList.innerHTML = ''; 

    if (tasks.length === 0) {
        noTasksMessage.classList.remove('hidden'); 
    } else {
        noTasksMessage.classList.add('hidden'); 
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.className = `todo-item ${task.completed ? 'completed' : ''}`;
            listItem.dataset.index = index; 

            listItem.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm1 3a1 1 0 000 2h2a1 1 0 100-2h-2z" clip-rule="evenodd" />
                    </svg>
                </button>
            `;

            // Add event listeners to the new elements
            const checkbox = listItem.querySelector('.todo-checkbox');
            const taskTextSpan = listItem.querySelector('.task-text');
            const deleteButton = listItem.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => toggleTaskComplete(index));
            taskTextSpan.addEventListener('click', () => toggleTaskComplete(index)); 
            deleteButton.addEventListener('click', () => deleteTask(index));

            taskList.appendChild(listItem);
        });
    }
}


function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        newTaskInput.value = ''; 
        saveTasks();
        renderTasks();
    }
}

function toggleTaskComplete(index) {
    if (tasks[index]) { 
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    if (tasks[index]) {
        tasks.splice(index, 1); 
        saveTasks();
        renderTasks();
    }
}


addTaskBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});


document.addEventListener('DOMContentLoaded', renderTasks);
