import React,{useState} from 'react';
import Header from '../Layout/Header';
import Profile from '../Layout/profilePage';
import PhotoGallery from '../Layout/photoGallery';
import {Grid,Paper,Tabs,Tab} from '@material-ui/core';
import User from './users';
import SendIcon from '@material-ui/icons/Send';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PhotoIcon from '@material-ui/icons/Photo';
import Conversations from './conversations';
import ChatBox from './chatbox';
const Chat:React.FC =() =>{
    const[scope,setScope] = useState('Global Chat');
    const[tab,setTab] = useState(0);
    const[user,setUser] = useState(null);

    const handleChange=(e:any,newVal:number)=>{
        setTab(newVal);
    }

    console.log(user);
    return(
        <>
        <Header />
        
        <Grid container spacing={1}>
            <Grid item xs={2}  >
                <Paper square elevation={5}>
                    <Paper square>
                        <Tabs 
                        onChange={handleChange}
                        value={tab}
                        indicatorColor='primary'
                        textColor='primary'
                        variant='fullWidth'
                        orientation='vertical'
                        >
                            <Tab icon={<VideoLabelIcon />} label=" My profile" />
                            <Tab  icon={<PhotoIcon/>} label='Photos'/>
                            <Tab icon={<SendIcon/>} label='Chats' />
                            <Tab icon={<PersonPinIcon/>} label='Users' />
                          

                        </Tabs>
                    </Paper>

                </Paper>
            </Grid>
            <Grid item xs={10} >
            {tab === 0 &&(  
                        <Profile  />
                )}
                {tab === 1 && (
                    <PhotoGallery />
                )}
                {tab === 2 && (
                    <Conversations setUser={setUser} setScope={setScope} />
                )}
                {tab === 3 && (
                    <User setUser={setUser} setScope={setScope} />
                )}
            </Grid>
           
            <Grid item md={12} >
                    <ChatBox scope={scope} user={user} />     
            </Grid>
        </Grid>
        
        </>
    )
    
}















export default Chat;