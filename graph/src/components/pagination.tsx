import React from 'react';

type Props={
    totalItem:any,
    itemPerPage:number,
    paginate:any
}
const Pagination:React.FC<Props> = ({totalItem,itemPerPage,paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalItem / itemPerPage);i++){
        pageNumbers.push(i);
    }
    return(
        <div className='col-lg-12'>
            <nav>
                <ul className='pagination overflow-auto'>
                    {
                        pageNumbers.map((e:number)=><li key={e}>
                            <a onClick={()=>paginate(e)} className='page-link'>{e}</a>
                        </li>)
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;