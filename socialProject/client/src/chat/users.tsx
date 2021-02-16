import React,{useState,useEffect} from 'react';
import {useGetUser} from '../service/userService';
import common from '../utils/common';
import socketIoClient from 'socket.io-client';
import {List,ListItem,ListItemText,ListItemAvatar,Avatar,} from '@material-ui/core';
import {makeStyles}from '@material-ui/core/styles';



interface UserProps{
  setUser:any,
  setScope:any
}

const useStyles = makeStyles((theme) => ({
    subheader: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    globe: {
      backgroundColor: theme.palette.primary.dark,
    },
    subheaderText: {
      color: theme.palette.primary.dark,
    },
    list: {
      maxHeight: "calc(100vh - 112px)",
      overflowY: "auto",
    },
    avatar: {
      margin: theme.spacing(0, 3, 0, 1),
    },
  }));
const User:React.FC<UserProps> =(props:any)=>{
    const classes = useStyles();
    const{setUser,setScope} = props;
    const[users,setUsers] = useState([]);
    const[newUser,setNewUser] = useState(null);
    const getUsers = useGetUser();
    
    useEffect(()=>{
        getUsers().then((res:any)=>setUsers(res));
       
    },[newUser]);

    useEffect(()=>{
        const socket = socketIoClient.connect('http://localhost:5000');
        socket.on('users',(data:any)=>{
            setNewUser(data);
        })
    },[]);
    
    return(
        <List className={classes.list}>
            {users && (
                <>
                {users.map((u:any)=>(
                    <ListItem key={u._id} 
                    className={classes.list}
                    onClick={()=>{
                        setUser(u);
                        setScope(u.name);
                    }} 
                    button
                    >
                        <ListItemAvatar className={classes.avatar}>
                            <Avatar src={`${u.avatar}`}>{common.getInitialsFromName(u.name)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={u.name} />
                    </ListItem>
                ))}
                </>
            )}
        </List>
    )
}




export default User;


