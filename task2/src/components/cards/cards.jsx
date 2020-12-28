import React,{useState} from 'react';
import './cards.css';

import TodoForm from '../cardForm/todoform';


const Cards = (props)=>{
    const{firstName,lastName,comment,type,email,report,dataFrom,dataTo,deleteTask,id,setType,updateTask} = props;
    const[open,setOpen] = useState({
        comment:false,
        form:false
    });
    
    const[update,setUpdate] = useState({
        firstName:firstName,
        lastName:lastName,
        comment:comment,
        type:type,
        email:email,
        report:report,
        dataFrom:dataFrom,
        dataTo:dataTo,
        id:id,
        setType:setType
    });
    const handleUpdate =(event)=>{
        event.preventDefault();
        updateTask(update);
    }
    return(
        <div className='cards' onDoubleClick={()=>setOpen({...open,form:!open.form})}>
            <div className="card_type">
                {type}
                <button className='btn delete' onClick={()=>deleteTask(id)}>
                    x
                </button>
            </div>
            <div className="card_title">
                <h2>{firstName} {lastName}</h2>
            </div>
          <div className="email">
              {email}
          </div>
          <div className="card_report">
              {report? 'Make report':'Dont make report'}
          </div>
            <div className="card_body">
                <button className='more' onClick={()=>setOpen({...open,comment:!open.comment})}>
                    See more
                </button>
                {open.comment && 
                <div className="comment_card">
                    {comment}
                </div>
                }
            </div>
            <div className="card_time">
                <span> From: {dataFrom}  </span>
                <span> To: {dataTo} </span>
            </div>
                {open.form &&
                    <TodoForm form={update} addTask={handleUpdate} change={setUpdate} />
                }
                </div>
    )
}


export default Cards;