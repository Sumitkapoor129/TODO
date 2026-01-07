const tasks=document.querySelector(".tasks");



function addtask(message){
const X = document.createElement("button");
const Done = document.createElement("button");
const h = document.createElement("h3");
const task= document.createElement("div");
X.classList.add("delete")
Done.classList.add("unchecked")
task.classList.add("task")
h.textContent=message
task.appendChild(h)
task.appendChild(Done)
task.appendChild(X)
task.setAttribute("draggable","true");//This will make it so that we can drag it.

tasks.appendChild(task)

}


const form =document.querySelector("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const task=document.querySelector(".userinput").value;
    if(task !="")addtask(task);
    document.querySelector(".userinput").value=""

    
})

document.body.addEventListener("click",(e)=>{
    if(e.target.className=="delete"){
        const a=e.target.parentElement;
        tasks.removeChild(a);
    }
    if(e.target.className=="unchecked"){ 
        if(e.target.textContent==""){
            e.target.parentElement.childNodes[0].style.textDecoration ="line-through"
        }
        else{
            e.target.parentElement.childNodes[0].style.textDecoration ="None"
        }
        e.target.textContent=e.target.textContent=="D"?"":"D"
    }
})


