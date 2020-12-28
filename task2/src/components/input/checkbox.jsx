import React from 'react';

const CheckBox =(props)=>{

const{title,onChange,checked,type} =props;
    return(
        <div className='report_form'>
        <label htmlFor={title}>{title}</label>
        <input 
        type={type} 
        name={title} 
        checked={checked}
        onChange={onChange}
        />
    </div>
    )
}

export default CheckBox;