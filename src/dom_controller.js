import {getAllProjects,getListByProjectID,deleteListByListID,deleteProjectByProjectID,createProject} from "./backend_logic"

let app=document.getElementById("app");
let displayProjectContainer=document.createElement("div");
let displayTodoListContainer=document.createElement("div");
let newProjectContainer= ()=>document.getElementById("newProjectContainer");

function displayTodoList(pid,ptitle){
    displayTodoListContainer.classList.remove("hidden");
    displayProjectContainer.classList.add("hidden");
    displayTodoListContainer.classList.add("displayTodoListContainer");
    console.log("hey in todolist")
    let todolists=getListByProjectID(pid);
    displayTodoListContainer.innerHTML=`<div class="title"><strong>Tasks of Project ${ptitle} </strong><button id="add-list">Add Task</button></div>`;
    for (let t of todolists){
        let displayIndividualTodoList=document.createElement("div");
        displayIndividualTodoList.classList.add("displayIndividualTodoList");
        let done=t.done? "Completed" : "Inprogress";
        displayIndividualTodoList.innerHTML=`
        <p><strong>Task</strong></>
        <p>title: ${t.title}</p>
        <p>description: ${t.description}</p>
        <p>due date: ${t.dueDate}</p>
        <p>priority: ${t.priority}</p>
        <p>progress: ${done}</p>
        <div><button>Edit</button><button class="delete-list">Delete</button></div>
        `;

        let deleteListBtn=displayIndividualTodoList.querySelector(".delete-list");
        deleteListBtn.addEventListener("click",()=>{
            //start deleting
            //console.log("under maint");
            deleteListByListID(t.id,pid);
            //end of deletion
            displayTodoList(pid,ptitle);
        })

        displayTodoListContainer.appendChild(displayIndividualTodoList);
    }
    app.appendChild(displayTodoListContainer);

    let addListBtn=document.getElementById("add-list");
    if (addListBtn){
        addListBtn.addEventListener("click",()=>{
            console.log("can you see me?")
            addList();      
  })
}
}

function displayProject(){
    displayTodoListContainer.classList.add("hidden");
    displayProjectContainer.classList.remove("hidden");
    displayProjectContainer.classList.add("displayProjectContainer");
    console.log("hey")
    let projects=getAllProjects();
    displayProjectContainer.innerHTML=`<div class="title"><strong>Projects</strong></div>`
    for (let p of projects){
        let displayIndividualProject=document.createElement("div");
        displayIndividualProject.classList.add("displayIndividualProject");
        let done=p.done? "Completed" : "Inprogress"
        displayIndividualProject.innerHTML=`
        <p><strong>Project</strong></>
        <p>title: ${p.title}</p>
        <p>description: ${p.description}</p>
        <p>due date: ${p.dueDate}</p>
        <p>priority: ${p.priority}</p>
        <p>progress: ${p.done}</p>
        <div><button class="select-project">View Tasks</button><button>Edit</button><button class="delete-project">Delete</button></div>
        `;
        
        let selectProjectBtn=displayIndividualProject.querySelector(".select-project");
        selectProjectBtn.addEventListener("click",()=>{
            displayTodoList(p.id,p.title);
        })

        let deleteProjectBtn=displayIndividualProject.querySelector(".delete-project");
        deleteProjectBtn.addEventListener("click",()=>{
            //start deleting
            //console.log("under maint");
            for (let dt of p.list_id){
                deleteListByListID(dt,p.id);
            }
            deleteProjectByProjectID(p.id);
            //end of deletion
            displayProject();
        })

        displayProjectContainer.appendChild(displayIndividualProject);
    }
    app.appendChild(displayProjectContainer)

}

function addProject(){
    let newProjectForm=document.createElement("div");
    newProjectForm.classList.add("newProject");
    newProjectForm.innerHTML=`
    <form class="form-class">
    <p>Add New Project</p>
    <input placeholder="Input project title..." type="text" required id="title-input">
    <input placeholder="Input project description..." type="text" required id="description-input">
    <p>Input project due date:</p>
    <input placeholder="Input project due date..." type="date" required id="duedate-input">
    <p>Select project priority:</p>
    <p><input type="radio" value="high" name="priority">High</p>
    <p><input type="radio" value="low" checked name="priority">Low</p>
    <p>Select project progress:</p>
    <p><input type="radio" value="Inprogress" checked name="progress">Inprogress</p>
    <p><input type="radio" value="Completed" name="progress">Completed</p>
    <br>
    <div class="form-button-class">
    <button type="submit" id="submit">Submit</button>
    <button type="button" id="cancel">Cancel</button>
    </div>
    </form>
    `;

    newProjectContainer().appendChild(newProjectForm);

    let cancelBtn=newProjectForm.querySelector("#cancel");
    cancelBtn.addEventListener("click",()=>{
        newProjectForm.remove();
    })

    let submitBtn=newProjectForm.querySelector(".form-class");
    submitBtn.addEventListener("submit",(e)=>{
        e.preventDefault();
        let title=document.getElementById("title-input").value;
        let description=document.getElementById("description-input").value;
        let duedate=document.getElementById("duedate-input").value;
        let priority=document.querySelector('input[name="priority"]:checked').value;
        let progress=document.querySelector('input[name="progress"]:checked').value;
        //console.log(title," ",description," ",duedate," ",priority," ",progress);
        createProject(title, description, duedate, priority,progress);
        console.log(title," ",description," ",duedate," ",priority," ",progress);
        displayProject();
    })
}

function addList(){
    let addListForm=document.createElement("div");
    addListForm.innerHTML=`
    <form class="form-class">
    <input type="text" required placeholder="Enter task title here...">
    <input type="text" required placeholder="Enter task description here...">
    <p>Select task due date:</p>
    <input type="date" required>
    <p>Select task priority:</p>
    <p><input type="radio" name="priority" value="High">High</p>
    <p><input type="radio" name="priority" checked value="Low">Low</p>
    <p>Select task progress:</p>
    <p><input type="radio" name="progress" checked value="Inprogress">Inprogress</p>
    <p><input type="radio" name="progress" value="Completed">Completed</p>
    <button type="submit">Submit</button>
    <button type="button">Cancel</button>
    </form>
    `;

    newProjectContainer().appendChild(addListForm);
}

export {displayProject,addProject,addList}