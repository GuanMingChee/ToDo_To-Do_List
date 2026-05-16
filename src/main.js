import './style.css'
import {displayProject} from "./dom_controller"

let app=document.getElementById("app");

app.innerHTML=`
<nav>To-Do List <div class="nav-btn"><button id="display-project">Display Project</button><button id="add-project">Add Project</button></div></nav>
<br>
<br>
`

displayProject();