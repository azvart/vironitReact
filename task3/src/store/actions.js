export const AddTask =(task)=>{
    let id = Math.floor(Math.random()*10000);
    task.id = id;
    return{
        type:'ADD_TASK',
        payload:task
    }
}

export const DeleteTask = (id)=>{
    console.log(id);
    return{
        type:'DELETE_TASK',
        payload:id
    }
}