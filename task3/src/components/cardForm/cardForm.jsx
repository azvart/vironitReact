import React,{useState} from 'react';
import './cardform.css';
import InputField from '../inputField/input';
import Select from '../inputField/select';
import TextField from '../inputField/textfield';
const CardForm =(props)=>{
    const{AddTask,form,setForm} = props;
    const[openComment,setOpenComment] = useState(false);
    
 
    
    const addTask=(event)=>{
        event.preventDefault();
        
        AddTask(form);
    }
    return(
            <div className='form-page'>
                <h2>Added new Card</h2>
                    <div className='form-container'>
                        <form onSubmit={addTask}>
                            <InputField
                                title="First Name:"
                                type="text"
                                value={form.firstName}
                                change={(e)=>setForm({...form,firstName:e.target.value})}
                            />
                             <InputField
                                title="Last Name:"
                                type="text"
                                value={form.lastName}
                                change={(e)=>setForm({...form,lastName:e.target.value})}
                            />
                             <InputField
                                title="Email:"
                                type="text"
                                value={form.email}
                                change={(e)=>setForm({...form,email:e.target.value})}
                            />
                            <InputField
                                title="Report: "
                                type="checkbox"
                                checked={form.report}
                                change={(e)=>setForm({...form,report:!form.report})}
                            />
                             <InputField
                                title="From:"
                                type="date"
                                value={form.dataFrom}
                                change={(e)=>setForm({...form,dataFrom:e.target.value})}
                            />
                            <InputField
                                title="To:"
                                type="date"
                                value={form.dataTo}
                                change={(e)=>setForm({...form,dataTo:e.target.value})}
                            />
                            <Select
                            setTypes={form.setType}
                            change = {(e)=>setForm({...form,type:e.target.value})}
                            />
                            <div className='more'>
                                <button className='open-comment' onClick={()=>setOpenComment(!openComment)}>
                                    More
                                </button>
                            </div>
                            {openComment && 
                                <TextField 
                                title='Comment'
                                value={form.comment}
                                change={(e)=>setForm({...form,comment:e.target.value})}
                                />
                            }
                            <div className="added">
                                <input type="submit" value='ADD'/>
                            </div>
                        </form>
                    </div>
            </div>
    )
}





export default CardForm;