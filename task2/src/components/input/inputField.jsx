import React from 'react';


const InputField=(props)=>{
    const{value,title,onChange,type }= props;
    
    return(
        <div className='input_field'>
            <label htmlFor={title}>{title}</label>
            <input 
            type={type} 
            name={title} 
            value={value}
            onChange={onChange}
            />
        </div>
    )
}



export default InputField;