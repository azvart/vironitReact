import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CurrentAction from '../store/actions/currentUserAction';
import {useDispatch,useSelector} from 'react-redux';
import UserRootReducer from '../store/index';
import {Card,CardActionArea,CardContent,CardMedia,Typography} from '@material-ui/core';
const useStyles = makeStyles({
    root:{
        width:'100%',
        height:'100%'
    },
    media:{
        objectFit:'cover'
    }

})




const Profile:React.FC =()=>{
    type RootState = ReturnType<typeof UserRootReducer>;
    const user:any = useSelector((state:RootState)=>state.UserReducer);
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(()=>{
        dispatch(CurrentAction());
    },[dispatch]);
    const date = new Date(Number(user.date));
    
    return(
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia 
                className={classes.media}
                component='img'
                alt='Avatar'
                height='190'
                title='Avatar'
                image={user.avatar}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {user.name}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p' >
                            {date.toDateString()}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>
    )
}




export default Profile;