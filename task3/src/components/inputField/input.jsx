import React from 'react';


const InputField =(props)=>{

    const{value,change,type,checked,title} = props;

    return(
        <div className='input-field'>
            <label>{title}</label>
        <input type={type}
        value={value}
        checked={checked}
        onChange={change}
        />
        </div>
    )
}




export default InputField;