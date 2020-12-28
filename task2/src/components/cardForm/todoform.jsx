import React,{useRef,useEffect} from 'react';

import './todoform.css';

import InputField from '../input/inputField';
import Select from '../input/select';
import TextField from '../input/textField';
import CheckBox from '../input/checkbox';






const TodoForm =(props)=>{





 

    return(
        
        <form onSubmit={props.addTask}>
            <InputField 
            type="text"
            value={props.form.firstName} 
            
            onChange={(e)=>props.change({...props.form,firstName:e.target.value})}
            title='First Name:' />
            <InputField
            type="text"
            value={props.form.lastName}
            title="Last Name:"
            onChange={(e)=>props.change({...props.form,lastName:e.target.value})}
            />
            <InputField 
            type="text"
            value={props.form.email}
            title="Email:"
            onChange={(e)=>props.change({...props.form,email:e.target.value})}
            />
            <InputField
            type="date"
            value={props.form.dataFrom}
            title="From"
            onChange={(e)=>props.change({...props.form,dataFrom:e.target.value})}
            />
            <InputField
            type="date"
            value={props.form.dataFrom}
            title="To"
            onChange={(e)=>props.change({...props.form,dataTo:e.target.value})}
            />
            <Select 
            title="Выберите категорию"
            data={props.form.setType}
            value={props.form.type}
            onChange={(e)=>props.change({...props.form,type:e.target.value})}
            />
            <CheckBox
            type="checkbox"
            title="Make report"
            checked={props.form.report}
            onChange={(e)=>props.change({...props.form,report:!props.form.report})}
            />
            <button onClick={(event)=>{
                event.preventDefault();
                props.change({...props.form,open:!props.form.open})
               
                }}>
                more
            </button>
            {props.form.open && 
            <TextField 
            title="Comment"
            value={props.form.comment}
            onChange={(e)=>props.change({...props.form,comment:e.target.value})}
            />
            }
            <div className='submit_form'>
            <input type="submit" value="ADD"/>
            </div>
        </form>
       
    )
}



export default TodoForm;