import React,{useState,useEffect} from 'react';

import history from '../utils/history';
import Login from './Login';
import Register from './Register';
import {authService} from '../service/authService';
import {Container} from '@material-ui/core';

const Home:React.FC =()=>{
    const[page,setPage] = useState('login');
    useEffect(()=>{
        
        if(authService.currentUserValue !== null){
            history.push('/chat');
        }
    },[]);

    const handleClick:any= (location:any)=>{
        setPage(location);
    }

    let Content:any;

    if(page === 'login'){
        Content = <Login handleClick = {handleClick} />
    }else{
        Content = <Register handleClick = {handleClick} />
    }

    return(
        <>
        <Container component='main' maxWidth='xs'>
            {Content}
        </Container>
       </>
    )
}


export default Home;