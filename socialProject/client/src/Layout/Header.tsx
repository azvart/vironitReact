import React,{useState} from 'react';
import {authService} from '../service/authService';
import history from '../utils/history';
//component
import {AppBar,Toolbar,Typography,FormGroup,FormControlLabel,Switch} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'flex',
    },

}));
const Header:React.FC =() =>{
    const classes = useStyles();
    const [currentUser] = useState(authService.currentUserValue);

    const[anchor,setAnchor] = useState(null);
    const[drop,setDrop] = useState(false);
    const handleLogout = () =>{
        authService.logout();
        history.push('/');
    }


    return(
        <div className={classes.root}>
       <AppBar position='static'>
           <Toolbar>
                <Typography variant='h5' className={classes.title}>
                    {currentUser.name}
                </Typography>
                <FormGroup>
                    <FormControlLabel control={<Switch checked={currentUser.success} aria-label='login switch' onChange={handleLogout} />} label={currentUser.success ? 'Logout':'Login'} />
                </FormGroup>
           </Toolbar>
        </AppBar>
        </div>    
       
    )
}





export default Header;