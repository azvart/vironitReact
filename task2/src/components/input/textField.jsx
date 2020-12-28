import React,{useRef,useEffect} from 'react';


const TextField =(props)=>{
    
    const{value,title,onChange} = props;
    const focusArea = useRef(null);

    useEffect(()=>{
        if(focusArea.current) focusArea.current.focus();
    },[focusArea]);
    
    return(
        <textarea ref={focusArea}  value={value} onChange={onChange} placeholder={title}>
            
        </textarea>
    )
}


export default TextField;