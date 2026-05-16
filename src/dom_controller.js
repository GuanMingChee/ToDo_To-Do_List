import {getAllProjects,getListByProjectID} from "./backend_logic"

let app=document.getElementById("app");

function displayProject(){
    let displayProjectContainer=document.createElement("div");
    displayProjectContainer.classList.add("displayProjectContainer");
    console.log("hey")
    let projects=getAllProjects();
    for (let p of projects){
        let displayIndividualProject=document.createElement("div");
        displayIndividualProject.classList.add("displayIndividualProject");
        displayIndividualProject.innerHTML+=`
        <p>title: ${p.title}</p>
        <p>description: ${p.description}</p>
        <p>due date: ${p.dueDate}</p>
        <p>priority: ${p.priority}</p>
        <p>progress: ${p.done}</p>
        <div><button id="select-project" onclick="displayTodoList(${p.id})">Select</button><button>Edit</button><button>Delete</button></div>
        `;
        displayProjectContainer.appendChild(displayIndividualProject);
    }
    app.appendChild(displayProjectContainer)
}

function displayTodoList(pid){

}

export {displayProject}