import React,{useRef,useEffect} from 'react';



const TextField =(props)=>{
    const{title,value,change} = props;
    const focusRef = useRef(null);
    useEffect(()=>{
        if(focusRef.current) focusRef.current.focus();
    },[focusRef]);
    return(
        <div className='input-field'>
            <textarea  
            ref={focusRef}
            cols="30" 
            rows="10"
            placeholder={title}
            value={value}
            onChange={change}
            >

            </textarea>
        </div>
    )
}




export default TextField;