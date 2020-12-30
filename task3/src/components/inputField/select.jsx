import React from 'react';

const Select =(props)=>{
    const{setTypes,change} = props;
    return (
        <div className='input-field'>
            <select onChange={change}>
                <option disabled>Выберите тип</option>
                {setTypes.map((e,index)=>{
                    return <option key={index} value={e}>{e}</option>
                })}
            </select>
        </div>
    )
}


export default Select;