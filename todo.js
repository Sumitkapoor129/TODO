const tasksContainer=document.querySelector(".task-cont");
const userinput= document.querySelector(".userinput");
const submit= document.querySelector(".submit");
const form =document.querySelector("#add-form");






const pinnedsec=creatediv("pinned");
const unmarkedsec=creatediv("unmarked");
const markedsec=creatediv("marked");
tasksContainer.appendChild(pinnedsec)
tasksContainer.appendChild(unmarkedsec)
tasksContainer.appendChild(markedsec)







let loadingtasks=false;

function loadtasks(){
    loadingtasks=true;
    let i=Number(localStorage.getItem("count"));

    for(let a=1;a<=i;a++){
        let msg=localStorage.getItem(`task${a}`)
        if(msg)
        addtask(msg,a);
    }
    loadingtasks=false;
}


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
function addtask(taskmessage,d=0){

    const task=creatediv("task");
    const taskname=creatediv("task-name")
    const taskbtn=creatediv("task-btn-cont")
    const marked=creatediv(["task-btn","marked"])
    const pinned=creatediv(["task-btn","pinned"])
    const deleted=creatediv(["task-btn","delete"])
    


    taskname.textContent=taskmessage
    marked.textContent="M";

    if(localStorage.getItem(d)==1){
    pinned.textContent="UP";
}
else{
    pinned.textContent="P";

}
    deleted.textContent="X";
    task.appendChild(taskname)
    taskbtn.appendChild(marked)
    taskbtn.appendChild(pinned)
    taskbtn.appendChild(deleted)
    task.appendChild(taskbtn)
    // console.log(task);
    if(localStorage.getItem(d)==1){
        pinnedsec.appendChild(task)
    }
    else{
    unmarkedsec.appendChild(task)}


    if(d!=0)task.id=d

    if(!loadingtasks){
        let i=0;
    if(localStorage.getItem("count")){
        i =localStorage.getItem("count")
    }
    localStorage.setItem(`task${Number(i)+1}`,taskmessage)
    if(d==0)task.id=Number(i)+1
    localStorage.setItem("count",`${Number(i)+1}`)
}

}

// localStorage.clear();
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    message=userinput.value;
    addtask(message)
    userinput.value="";
})
loadtasks()
tasksContainer.addEventListener("click",(e)=>{
   if(e.target.textContent=="X"){
    console.log(e.target.parentElement.parentElement);
    e.target.parentElement.parentElement.remove();


    let id=e.target.parentElement.parentElement.id;
    localStorage.removeItem(`task${id}`)
    let a=Number(localStorage.getItem("count"));
    localStorage.setItem("count",a)


   }
   if(e.target.textContent=="P"){
    e.target.textContent="UP"
    const ele=e.target.parentElement.parentElement
    const id=e.target.parentElement.parentElement.id
    console.log(id);
    localStorage.setItem(`${id}`,"1")
    pinnedsec.appendChild(ele);
   }
   else if(e.target.textContent=="UP"){
    // e.target.textContent="P"
    // const ele=e.target.parentElement.parentElement
    const id=e.target.parentElement.parentElement.id
    localStorage.setItem(`${id}`,"0")
    unmarkedsec.innerHTML="";
    pinnedsec.innerHTML="";
    loadtasks();
    // unmarkedsec.appendChild(ele);
   }
})




