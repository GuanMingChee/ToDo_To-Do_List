import './style.css'
import {displayProject,addProject,addList} from "./dom_controller"

let app=document.getElementById("app");

app.innerHTML=`
<nav>To-Do List <div class="nav-btn"><button id="display-project">Display Project</button><button id="add-project">Add Project</button></div></nav>
<br>
<br>
<div id="newProjectContainer"></div>
`

let displayProjectBtn=document.getElementById("display-project");
displayProjectBtn.addEventListener("click",()=>{
  displayProject();
})

let addProjectBtn=document.getElementById("add-project");
addProjectBtn.addEventListener("click",()=>{
  addProject();
})

displayProject();