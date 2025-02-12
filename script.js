// Simulated User Data (for demonstration purposes)
let users = [];
let currentUser = null;

// DOM Elements
const authSection = document.getElementById('auth-section');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const dashboardSection = document.getElementById('dashboard-section');
const logoutBtn = document.getElementById('logoutBtn');
const taskList = document.getElementById('taskList');
const addTaskForm = document.getElementById('addTaskForm');
const taskInput = document.getElementById('taskInput');

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
signupForm.addEventListener('submit', handleSignup);
showSignup.addEventListener('click', () => toggleAuthForms('signup'));
showLogin.addEventListener('click', () => toggleAuthForms('login'));
logoutBtn.addEventListener('click', handleLogout);
addTaskForm.addEventListener('submit', handleAddTask);

// Functions
function toggleAuthForms(formType) {
    if (formType === 'signup') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'block';
    } else {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        authSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        renderTasks();
    } else {
        alert('Invalid email or password');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    const userExists = users.some(u => u.email === email);
    if (userExists) {
        alert('User already exists');
    } else {
        const newUser = { name, email, password, tasks: [] };
        users.push(newUser);
        alert('Signup successful! Please login.');
        toggleAuthForms('login');
    }
}

function handleLogout() {
    currentUser = null;
    dashboardSection.style.display = 'none';
    authSection.style.display = 'block';
}

function handleAddTask(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        currentUser.tasks.push(taskText);
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    currentUser.tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(index));
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    currentUser.tasks.splice(index, 1);
    renderTasks();
}