import React,{useState,useEffect,useRef} from 'react';
import common from '../utils/common';
import {default as classnames} from 'classnames' ;
import socketIoClient from 'socket.io-client';
import {
    useGetGlobalMessages,
    useSendGlobalMessages,
    useGetConversationsMessages,
    useSendConversationMessages,
} from '../service/chatService';
import {authService} from '../service/authService';
import { makeStyles } from "@material-ui/core/styles";

import {
    Grid,
    Typography,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Paper,
    Divider,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
interface BoxProps{
    scope:string,
    
    user:any
}

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
    },
    headerRow: {
      maxHeight: 60,
      zIndex: 5,
    },
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      color: theme.palette.primary.dark,
    },
    messageContainer: {
      height: "100%",
      display: "flex",
      alignContent: "flex-end",
    },
    messagesRow: {
      maxHeight: "calc(100vh - 184px)",
      overflowY: "auto",
    },
    newMessageRow: {
      width: "100%",
      padding: theme.spacing(0, 2, 1),
    },
    messageBubble: {
      padding: 10,
      border: "1px solid white",
      backgroundColor: "white",
      borderRadius: "0 10px 10px 10px",
      boxShadow: "-3px 4px 4px 0px rgba(0,0,0,0.08)",
      marginTop: 8,
      maxWidth: "40em",
    },
    messageBubbleRight: {
      borderRadius: "10px 0 10px 10px",
    },
    inputRow: {
      display: "flex",
      alignItems: "flex-end",
    },
    form: {
      width: "100%",
    },
    avatar: {
      margin: theme.spacing(1, 1.5),
    },
    listItem: {
      display: "flex",
      width: "100%",
    },
    listItemRight: {
      flexDirection: "row-reverse",
    },
  }));

const ChatBox:React.FC<BoxProps> =(props):any=>{
    
const classes = useStyles();
const{scope,user} = props;

const[currentUserId] = useState(
    authService.currentUserValue.userId
);
const[newMessage,setNewMessage] = useState("");
const[messages,setMessages] = useState([]);
const[lastMessage,setLastMessage] = useState(null);
const[conversationId,setConversationId] = useState('');

const getGlobalMessages = useGetGlobalMessages();
const sendGlobalMessages = useSendGlobalMessages();
const getConversationsMessages = useGetConversationsMessages();
const sendConversationMessages = useSendConversationMessages();

let chatBottom:any = useRef(null);

useEffect(()=>{
    reloadMessages();
    scrollToBottom();
},[lastMessage,scope]);

useEffect(()=>{
    const socket = socketIoClient.connect('http://localhost:5000');
    socket.on("messages",(data:any)=>setLastMessage(data));

},[]);

const reloadMessages =()=>{
    if(scope === "Global Chat"){
        getGlobalMessages().then((res)=>{
            console.log(res);
            setMessages(res);
        });
    }else if(scope !== null){
        getConversationsMessages(user._id).then((res)=>setMessages(res));
    }else{
        setMessages([]);
    }
}

const scrollToBottom =()=>{
    chatBottom.current.scrollIntoView({behavior:"smooth"});
};

useEffect(scrollToBottom,[messages]);

const handleSubmit =(e:any)=>{
    e.preventDefault();
    if(scope === "Global Chat"){
        
        sendGlobalMessages(newMessage).then(()=>{
            setNewMessage('');
        });
    }else{
        sendConversationMessages(user._id,newMessage).then((res)=>{
            setConversationId(res.conversationId);
            setNewMessage('');
        })
    }
};


return(
    <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.headerRow}>
            <Paper square elevation={2} className={classes.paper}>
                <Typography color='inherit' variant='h6'>
                        {scope}
                </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            
                <Grid container className={classes.messageContainer}>
                    <Grid item xs={12} className={classes.messagesRow}>
                           {messages && (
                               <List>
                                   {messages.map((m:any)=>(
                                       <ListItem key={m._id}
                                        className={classnames(classes.listItem,{
                                            [`${classes.listItemRight}`]:
                                            m.fromObj[0]._id === currentUserId,
                                        })}
                                        alignItems="flex-start"
                                       >
                                        <ListItemAvatar className={classes.avatar}>
                                            <Avatar alt='avatar'  >
                                                {common.getInitialsFromName(m.fromObj[0].name)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                        classes={{
                                            root:classnames(classes.messageBubble,{
                                                [`${classes.messageBubbleRight}`]:
                                                m.fromObj[0]._id === currentUserId,
                                            }),
                                        }}
                                        primary={m.fromObj[0] && m.fromObj[0].name}
                                        secondary={<>{m.body}</>}
                                        />

                                        
                                       </ListItem>
                                   ))}
                               </List>
                           )}

                          
                            <div ref={chatBottom}/>
                    </Grid>
                    <Grid item xs={12} className={classes.inputRow}>
                                <form onSubmit={handleSubmit} className={classes.form}>
                                        <Grid container alignItems="flex-end" className={classes.newMessageRow}>
                                            <Grid item xs={11} >
                                                <TextField 
                                                label="Message"
                                                variant='outlined'
                                                margin='dense'
                                                fullWidth
                                                value={newMessage}
                                                onChange={(e)=>setNewMessage(e.target.value)}
                                                id='message'/>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton type='submit'>
                                                    <SendIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                </form>
                    </Grid>
                </Grid>
        </Grid>
    </Grid>
)







}


export default ChatBox;