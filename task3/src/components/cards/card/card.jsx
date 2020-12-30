import React,{useState} from 'react';
import CardForm from '../../cardForm/cardForm';




const Card = (props)=>{
    const {firstName,lastName,email,type,comment,dataFrom,dataTo,report,removeItem,id,updateTask} = props;
    const[openForm,setOpenForm] = useState(false);
    const[updateForm, setUpdateForm] = useState({
        firstName:firstName,
        lastName:lastName,
        email:email,
        type:type,
        comment:comment,
        report:report,
        dataFrom:dataFrom,
        dataTo:dataTo,
        setType:["Work","Home","Another"],
        id:id
    });
  
    return(
        
                <div  className='card' onDoubleClick={()=>setOpenForm(!openForm)}>
                        <div className='card-top'>
                            {type}
                            <button className='card-delete' onClick={()=>removeItem(id)}>
                                x
                            </button>
                        </div>
                        <div className="card-title">
                            <h3>
                                {firstName}
                                {lastName}
                            </h3>
                            <p>{email}</p>
                        </div>
                        <div className="card-body">
                            {comment}
                        </div>
                        <div className="card-report">
                            {report? 'Make report':'Dont make report'}
                        </div>
                        <div className="card-time">
                            <span>From: {dataFrom}</span>
                            <span>To: {dataTo}</span>
                        </div>
                                {openForm && 
                                <CardForm form={updateForm} AddTask={updateTask} setForm={setUpdateForm} />
                                }
                    </div>
       
    )
}



export default Card;