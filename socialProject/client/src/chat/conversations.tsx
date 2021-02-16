import React,{useState,useEffect} from 'react';
import common from '../utils/common';
import {List,ListItem,ListItemText,ListItemAvatar,Avatar,Divider} from '@material-ui/core';
import socketIoClient from 'socket.io-client';

import {authService} from '../service/authService';

import {useGetConversations} from '../service/chatService';

interface ConversationsProps{
    setUser:any,
    setScope:any
}

const Conversations:React.FC<ConversationsProps> =(props)=>{
    
    const[conversations,setConversations] = useState([]);
    const[newConversation,setNewConversation] = useState(null);
    const getConversations = useGetConversations();
   
    const handleRecipient = (recipients:any) => {
        for (let i = 0; i < recipients.length; i++) {
          if (
            recipients[i].name !==
            authService.currentUserValue.name
          ) {
            return recipients[i];
          }
        }
        return null;
      };

    useEffect(()=>{
        getConversations().then((res)=>setConversations(res));
    },[newConversation]);

    useEffect(()=>{
        let socket:any = socketIoClient.connect('http://localhost:5000');
        socket.on("messages",(data:any)=>{
            
            setNewConversation(data)});
        return ()=>{
            socket.removeListener("messages");
        }
    },[]);
 
    return(
        <List>
            <ListItem
            onClick={()=>props.setScope("Global Chat")}
            >   
                <ListItemText  primary="Global Chat" />
            </ListItem>
            <Divider />
            {conversations && (
                <>
                {conversations.map((c:any)=>(
                    <ListItem key={c._id} button onClick={()=>{
                        props.setUser(handleRecipient(c.recipientObj));
                        props.setScope(handleRecipient(c.recipientObj).name);
                        }}>
                            <ListItemAvatar>
                               <Avatar>
                                   {common.getInitialsFromName(handleRecipient(c.recipientObj).name)}
                               </Avatar>
                                   
                            </ListItemAvatar>
                            <ListItemText primary={handleRecipient(c.recipientObj).name}
                            secondary={<>{c.lastMessage}</>}
                            />
                    </ListItem>
                ))}
                </>
            )}
        </List>
    )
}





export default Conversations;