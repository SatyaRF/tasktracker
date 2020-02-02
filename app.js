const form = document.querySelector('#task-form');
const ul = document.querySelector('ul');
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();


function loadEventListeners() {
document.addEventListener('DOMContentLoaded', getTasks);
form.addEventListener('submit', submitTasks);
ul.addEventListener('click', deleteTask);
clrBtn.addEventListener('click', cleartaskHandler);
filter.addEventListener('keyup', filterTaskHandler);
}

//Get Tasks from LS;

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('collection-item');
    li.appendChild(document.createTextNode(task));

    //Create link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = `<li class="fa fa-remove"></li>`
    li.appendChild(link)

    //Append li to ul
    ul.appendChild(li);
    });
}

function storeTaskToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function submitTasks(e) {

    if(taskInput.value === ''){
        alert('Add a task');
    }
    e.preventDefault();
    //Create li element
    const li = document.createElement('li');
    li.classList.add('collection-item');
    li.appendChild(document.createTextNode(taskInput.value));

    //Create link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = `<li class="fa fa-remove"></li>`
    li.appendChild(link)

    //Append li to ul
    ul.appendChild(li);

    storeTaskToLocalStorage(taskInput.value);

    taskInput.value = '';
    
}
function deleteTask(e) {
    if(e.target.parentNode.classList.contains('delete-item')){
        if(confirm('Are you sure')){
            e.target.parentNode.parentNode.remove();
            removeTaskFromLocalStorage(e.target.parentNode.parentNode)
        }
    }
    
}

function removeTaskFromLocalStorage(taskItem) {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function cleartaskHandler() {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    clearTaskFromLocalStorage();
    
}

function clearTaskFromLocalStorage() {
    localStorage.clear();
}

function filterTaskHandler(e) {
    const text = e.target.value.toLowerCase();
    // const liArr = [...(document.querySelectorAll('.collection-item'))];
    // console.log(liArr);
    // liArr.filter(el => {
    //     if (el.innerText.contains(text)) {
    //         el.style.display = 'block';
    //     } else {
    //         el.style.display = 'none';
    //     }
    //     console.log(el.innerText)
    // });
    
    document.querySelectorAll('.collection-item').forEach(element => {
        const search = element.firstChild.textContent.toLowerCase();
        if (search.indexOf(text) != -1) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
    
}

