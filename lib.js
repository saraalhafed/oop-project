//this file for creating classes,we need to send this file to main we shous export
//title,what come from input
//it will great to have uniqe id for each item

let data =[];//to use it for render in the browser

 export class Task{
    constructor(title){
       this.title=title;
       this.date= new Date();// becuase i want to show (when the task is ceated),this Date():give millisecond, real date with details
       this.id= Date.now(); // to ceate id ,Date.now(): give a number without millisecond , it will be not same as the result for Date() 
       this.completed=false; //always each task start from false

    }
     // we will use this inside of instance (task ), therefore static cannot be writtten
    addTask(){
       data.push(this)
    }
//we shoud save delete data, we cover it later so we not deleted at all,we we have database external we can see it ,
static  deleteTaskById(id){
        data = data.filter(task => task.id != id) //we keeep all the task axept this id for thids task to remove it
    }

    static   toggleComplete(id){
    const taskIndex =data.findIndex(task=> task.id == id);// get the id for the task ,findIndex
    data[taskIndex].completed = !data[taskIndex].completed;  //for this task make this properity opesitoff,if false make true
    }
}

const tas1 =new Task("washing");
console.log(tas1.date);//Fri Jun 28 2024 09:55:16 GMT+0200 (Central European Summer Time)
console.log(tas1.id);//1719561330079

// This class includes methods to serve UI part so we don't need properties which means we don't need constructor
// we make btn to hide or show this html input  btn 
//will be handelt in
export class Ui{
    static showAddCard(){ //without parameter wile no constractor
        const overlay = document.getElementById('overlay');
        overlay.classList.add('show'); //show the card 
        overlay.classList.remove('hide');//
    }

    static hideAddCard(){
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('show');
        overlay.classList.add('hide');
    }
//we use statice 
    // This render method will render the tasks in the UI and will update statistics part (completed or not ). // we will use this inside of instance , therefore static cannot be writtten. Static is used to make method only for class not for instance of it. So if you want to reach class method directly , you should use static. If you want to reach instance method , you should not use static.
    static render(){
        //get the task
        const tasks = document.getElementById('tasks')
         tasks.innerHTML = " <h2> Your Tasks </h2>"
         //rech id stats  select card and 3 child to render all the task
         document.querySelector("#stats .card:nth-child(3) p").textContent = data.length;
         document.querySelector("#stats .card:nth-child(1) p").textContent = data.filter(task => task.completed === true).length;
         document.querySelector("#stats .card:nth-child(2) p").textContent = data.filter(task => task.completed === false).length;
         //inside the task we need to show : div and giv it classname
         data.forEach(task => {
            const div = document.createElement('div');
            div.classList.add('task')
            if(task.completed) div.style.background = 'lightgreen';
            else{
                div.style.background = "white"
            }//it is better to creat id to use it later to delete
            // we are creating id for each div so later on we can use id of div to delete or toggle etc.
             div.id = `task-${task.id}`
              // Now are are creating task itself
              // we style the html
              // checkbox for completed or not completed task
              div.innerHTML = `
                 <input type="checkbox" class="check"  />      
                 <div class="task-details">
                     <h3 class="task-title">${task.title}</h3>
                     <small> ${task.date}</small>
                 </div>
                 <div class="actions">
                    <button><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete-btn"><i class="fa-solid fa-trash" ></i></button>
                 </div>
              `
              tasks.appendChild(div);
         })
        }
 }
        

