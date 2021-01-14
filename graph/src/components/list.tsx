import  React,{useEffect,useMemo} from 'react';

import {Link} from 'react-router-dom';

type Props={
    items:any,
    indexOfFirstItem:number,
    indexOfLastItem:number,
   
}


const Item:React.FC<Props> = ({items,indexOfFirstItem,indexOfLastItem}) =>{

   const value = useMemo(()=>items.slice(indexOfFirstItem,indexOfLastItem),[items,indexOfFirstItem,indexOfLastItem]);
   
  
    
    return(
        <div className='col-lg-12'>
            
                
            {value.map((e:any,index:number)=>{return<nav className='navbar navbar-light bg-light' key={index}> <Link to={`/${e.id}`} className='navbar-brand'  >{e.name}</Link></nav>})}  

                
            
        </div>
    )
}


export default Item;


