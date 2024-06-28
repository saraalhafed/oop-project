// this file will handel do manibolation


import { Task, Ui } from './lib.js'

// This is add button from navigation where will open add task panel
const addBtn = document.querySelector('nav button')
// This is cancel button from add task panel where will close the panel
const cancelBtn = document.querySelector('#overlay button[type="reset"]')

// Event Listeners to open and close panel
addBtn.addEventListener('click', Ui.showAddCard)
cancelBtn.addEventListener('click', Ui.hideAddCard)

//Adding  a task
document.querySelector('form').addEventListener('submit',addTaskFromForm)
//can not reach it dirctly

// toggle complete button event handlers
document.addEventListener('change',e => {
    if(e.target.className.includes('check')){
        // getting id of the task that will be toggled
        const id = e.target.parentElement.id.split('-')[1]
        e.target.checked = true;
        Task.toggleComplete(id);
        Ui.render();
    }
})



// delete button event handlers
document.addEventListener('click', e => {
    if(e.target.className.includes('delete-btn')){
        // getting id of the task to be deleted.
        //we need get id from the div which it  big parent, htnl innerhtml
        const id = e.target.parentElement.parentElement.id.split('-')[1]

        // deleting the task from data
        Task.deleteTaskById(id);
          // re-rendering the tasks in the UI after deleting a task.
        Ui.render();
    }
})


function addTaskFromForm(e){
    e.preventDefault();
    // to get input for adding task
    const taskInput = document.querySelector('#addCard input')//reach the task from input
    // creating instance of Task class
    // we dont use static befor data()
    const task = new Task(taskInput.value) // i use the input value as parameter instead of title in consztructor
   // adding task to data which we created from Task class 
   //addTask() we need this for generate task instance
    task.addTask();
 // clearing input field
    taskInput.value = '';
    // Closing panel after adding task
    Ui.hideAddCard();
    // re-rendering the tasks in the UI after adding a new task.
    Ui.render(); // we useing data 
}

//befor use static inside ui for method render() ,so we cann not reach the method here ,but when use the static it will be the method render()just for Ui class , than can we use Ui.render() in main.js
// This will render the tasks in the UI when page opens
Ui.render(); // 