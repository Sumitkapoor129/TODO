const tasksContainer=document.querySelector(".task-cont");
const tasklayout=document.querySelector(".task");
const userinput= document.querySelector(".userinput");
const submit= document.querySelector(".submit");
const form =document.querySelector("#add-form");
// console.log(tasklayout);

function creatediv(classes){
    const div=document.createElement("div")
    if(Array.isArray(classes)){
        classes.forEach(c => {
            div.classList.add(`${c}`)
        });  
    }
    else{
        div.classList.add(`${classes}`)
    }
    return div
}
function addtask(taskmessage){
    const task=creatediv("task");
    const taskname=creatediv("task-name")
    const taskbtn=creatediv("task-btn-cont")
    const marked=creatediv(["task-btn","marked"])
    const pinned=creatediv(["task-btn","pinned"])
    const deleted=creatediv(["task-btn","delete"])

    taskname.textContent=taskmessage
    marked.textContent="M";
    pinned.textContent="P";
    deleted.textContent="X";
    task.appendChild(taskname)
    taskbtn.appendChild(marked)
    taskbtn.appendChild(pinned)
    taskbtn.appendChild(deleted)
    task.appendChild(taskbtn)
    // console.log(task);
    tasksContainer.appendChild(task)
    saveData();
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    message=userinput.value;
    addtask(message)
    userinput.value="";
})


function saveData(){
    localStorage.setItem("task",JSON.stringify(tasksContainer.innerHTML));
}
function getData(){
    let data = localStorage.getItem("task");
    tasksContainer.innerHTML = JSON.parse(data);
}
tasksContainer.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete")){
        tasksContainer.removeChild(e.target.parentElement.parentElement) 
    }
    saveData();
})

getData();



