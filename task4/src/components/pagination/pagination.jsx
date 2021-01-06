import React from 'react';



const Pagination = (props)=>{
const{totalItem,itemPerPage,paginate} = props;

const pageNumbers = [];
for(let i = 1; i <=Math.ceil(totalItem/itemPerPage);i++){
    pageNumbers.push(i);
}
    return(
        
            <div className='col-lg-12'>
                <nav aria-label='Links navigation'>
                    <ul className='pagination overflow-auto'>
                        {
                            pageNumbers.map(number=>(
                                <li key={number} className='page-item'>
                                    <a onClick={()=>paginate(number)} className='page-link'>
                                        {number}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        
    )
}



export default Pagination;