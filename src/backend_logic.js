let arrP=JSON.parse(localStorage.getItem("arrP")) || [];
let arrT=JSON.parse(localStorage.getItem("arrT")) || [];

function getAllProjects(){
    console.log(arrP)
    return arrP;
}

function storeToLocalP(){
    localStorage.setItem("arrP",JSON.stringify(arrP))
}

function storeToLocalT(){
    localStorage.setItem("arrT",JSON.stringify(arrT))
}

function createProject(title, description, dueDate, priority,done){
    let id=crypto.randomUUID();
    let list_id=[];
    let p={id,title,description,dueDate,priority,done,list_id};
    arrP.push(p);
    storeToLocalP();
    return id;
}

function createToDoList(pid,title, description, dueDate, priority,done){
    let id=crypto.randomUUID();
    let t={id,title,description,dueDate,priority,done};
    arrT.push(t);

    let target_p=arrP.find(p=>p.id===pid);
    target_p.list_id.push(id);
    storeToLocalT();
    storeToLocalP();
    return id;
}

function getAllList(){
    console.log(arrT)
    return arrT;
}

function getListByProjectID(id){
    let target=arrP.find(p=>p.id===id);
    let tmp_arr=[];
    for (let t of target.list_id){
        tmp_arr.push(arrT.find(todolist=>todolist.id===t))
    }
    return tmp_arr;
}

function deleteListByListID(tid,pid){
    arrT=arrT.filter(t=>t.id!==tid);
    let target=arrP.find(p=>p.id===pid);
    target.list_id=target.list_id.filter(p=>p!==tid);
    storeToLocalT();
    storeToLocalP();

}

function deleteProjectByProjectID(pid){
    let target=arrP.findIndex(p=>p.id===pid);
    let toDelete=arrP[target];
    if (toDelete.list_id.length===0){
        arrP.splice(target,1);
    }
    else{
        console.log("ToDo List not empty")
    }
    storeToLocalP();
}

//let p=createProject("xxx","ddd","wgryh","ergergr")
//createToDoList(p,"xxx","ddd","wgryh","ergergr")
getAllProjects()
export {getAllProjects,getListByProjectID,deleteListByListID,deleteProjectByProjectID,createProject}