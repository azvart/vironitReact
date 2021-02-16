import React,{useState} from 'react';
import {Input,Button} from '@material-ui/core';
import {authService} from '../service/authService';

import {makeStyles} from '@material-ui/core/styles';
import AddedPhotoUser from '../store/actions/addedPhotoAction';
import {useDispatch,useSelector} from 'react-redux';
import UserRootReducer from '../store/index';
import{Grid,GridList,GridListTile,ListSubheader,} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: '#37474f',
      color:'#ffffff'
    },
    gridList: {
      width: '100%',
      height: 450,
    },
    img:{
        width:'100%',
        height:'100%',
        objectFit:'fill',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));


const PhotoGallery:React.FC =()=>{
    const classes = useStyles();
    type RootState = ReturnType<typeof UserRootReducer>;
    const photoUser:any= useSelector((state:RootState)=>state.UserReducer);
    const[user] = useState(authService.currentUserValue);
    const dispatch = useDispatch();
    
    const[photo,setPhoto] = useState('');
    const[isSubmitted,setIsSubmitted] = useState(false);
    

 
    const handleChange = (event:any)=>{
        const file = event.target.files[0];
        setPhoto(file);
        
    }

    const handleFormSubmit=(event:any)=>{
        event.preventDefault();
        dispatch(AddedPhotoUser(user.userId,user.token,photo));
        setIsSubmitted(true);
    }
  
  
 
 
    return(
        <Grid container spacing={1} >
            <Grid item lg={12}>
            <form encType='multipart/form-data' onSubmit={handleFormSubmit}>
                <Input type='file' name='photos' id='photos' onChange={handleChange} />
                <Button type='submit' >
                    Add photo
                </Button>
            </form>
            </Grid>
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key='Subheader' cols={2} style={{height:'auto'}}>
                        <ListSubheader component='div' >My Photo</ListSubheader>
                    </GridListTile>
                    {photoUser.photo.map((e:string,index:number)=>(
                        <GridListTile key={index}>
                            <img className={classes.img} src={`./img/photos/${user.userId}/${e}`} alt='' />
                        </GridListTile>
                    ))}
                </GridList>
            </div>

        </Grid>
    )
}




export default PhotoGallery;