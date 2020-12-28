import React from 'react';


const Select =(props)=>{

    const{title,onChange,data,value} = props;
    const options = data.map((e,index)=>
        <option key={index} value={e}>{e}</option>
    )
    return(
        <select value={value} onChange={onChange}>
            <option disabled >{title}</option>
            {options}
        </select>
    )
}



export default Select;