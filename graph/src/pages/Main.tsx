import React from 'react';

type Props={
    children:any
}


const MainPage:React.FC<Props> = ({...children})=>{
    return(
        <main className='container-fluid' {...children} />
    )
}



export default MainPage;