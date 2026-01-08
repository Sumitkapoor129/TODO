const tasksContainer=document.querySelector(".task-cont");
const userinput= document.querySelector(".userinput");
const submit= document.querySelector(".submit");
const form =document.querySelector("#add-form");
const searchform=document.querySelector("#search-form")
const usersearch=document.querySelector(".search")
const sliderbutton=document.querySelector(".slider-btn")
const slider=document.querySelector(".slider");

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
    if(localStorage.getItem(d)==2){
    marked.textContent="UM";}
    else{
      marked.textContent="M";  
    }

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
    else if(localStorage.getItem(d)==2){
        markedsec.appendChild(task)
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

// adding task and storing in local storage 
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    message=userinput.value;
    addtask(message)
    userinput.value="";
})
loadtasks()
//task-options implementation
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
    markedsec.innerHTML="";
    loadtasks();
    // unmarkedsec.appendChild(ele);
   }
   if(e.target.textContent=="UM"){
    e.target.textContent="M"
    const ele=e.target.parentElement.parentElement
    const id=e.target.parentElement.parentElement.id
    localStorage.setItem(`${id}`,"0")
    unmarkedsec.appendChild(ele);
   }
   else if(e.target.textContent=="M"){
       e.target.textContent="UM"
       console.log(e.target.textContent);
       
       const id=e.target.parentElement.parentElement.id
       console.log(id);
    localStorage.setItem(`${id}`,"2")
    unmarkedsec.innerHTML="";
    pinnedsec.innerHTML="";
    markedsec.innerHTML="";
    loadtasks();
   }
})

//Search Feature 
searchform.addEventListener("submit",(e)=>{
    e.preventDefault();
})
searchform.addEventListener("input",(e)=>{
    const alltasks=document.querySelectorAll(".task")
    e.preventDefault()
    // console.log(usersearch.value);

    if(usersearch.value==""){
        console.log(alltasks);
        alltasks.forEach((task)=>{
            if(task.classList.contains("hidden")){
                task.classList.remove("hidden") 
            }
        })
    }
    else{
        alltasks.forEach((task)=>{
            task.classList.add("hidden");
            if(task.children[0].textContent.includes(usersearch.value)){
                // console.log("worked");
                task.classList.remove("hidden");}
            console.log(task.classList);
        })
        
    }
    
})

//Slider feature
sliderbutton.addEventListener("click",(e)=>{
    console.log(e.target.textContent);
    
    if(e.target.textContent ==">"){
        slider.classList.toggle("hidden")
        slider.style.width="15%";
        slider.style.height="45%";
        
        e.target.textContent="<"}
        else{
        slider.classList.toggle("hidden")
        e.target.textContent=">"
        slider.style.width="0%";
    }
})


