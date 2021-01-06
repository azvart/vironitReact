import React,{useMemo} from 'react';
import{Link} from 'react-router-dom';

const Links =(props)=>{
    const{items,indexOfFirstItem,indexOfLastItem} = props;
    const value=useMemo(()=>items,[items])
    const paginateItem = value.slice(indexOfFirstItem,indexOfLastItem);
    return(
           
                <div className="col-lg-4">
                    {paginateItem.map((item,index)=>(
                        <li key={index} className='list-group-item'>
                            <Link className='nav-link' to={item.id}>
                            {item.name}
                            </Link>
                        </li>
                    ))}
                </div>
           
    )
}






export default Links;