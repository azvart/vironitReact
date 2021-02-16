import React from 'react';

import history from '../utils/history';

import LoginGoogle from '../service/googleAuth';
import GoogleLogin from 'react-google-login';
import * as Yup from 'yup';
import {Formik} from 'formik';

import {Grid ,TextField ,Typography,Link,Button }from '@material-ui/core';
import LoginAction from '../store/actions/loginAction';
import {useDispatch} from 'react-redux';

interface LoginProps{
    handleClick:any
}


const Login:React.FC<LoginProps> =({handleClick})=>{
        
        const dispatch = useDispatch();
    const responsibleGoogle = async (authResult:any)=>{
        try{
            if(authResult['code']){
                 await LoginGoogle(authResult['code']);
                console.log(authResult);

            }else{
                throw new Error(authResult);
            }
        }catch(e){
            console.log(e);
        }
    }
    return(
        <Grid container>
            <Grid item>
            <Typography component='h1' variant='h5' align='center'>
                Sign in
            </Typography>
            <Formik
                initialValues={{
                    email:'',
                    password:''
                }}
                validationSchema={
                    Yup.object().shape({
                        email:Yup.string()
                        .required('Email is required')
                        .max(40,"Email is too long"),
                        password:Yup.string()
                        .required('Password is required')
                        .max(100,'Password is too long')
                        .min(6,'Password too short')
                    })
                }
                onSubmit={(
                    {email,password},
                    {setStatus,setSubmitting}
                )=>{
                    setStatus();
                    dispatch(LoginAction(email,password));
                    const{from}:any = history.location.state || {
                        from:{pathname:'/chat'},
                    };
                    history.push(from);
                }}>
                    {({handleSubmit,handleChange,values})=>(
                        <form onSubmit={handleSubmit} >
                           
                                <TextField

                                id='email'
                                name='email'
                                required
                                value={values.email}
                                onChange={handleChange}
                                type="email" 
                                label='Email'
                                fullWidth={true}
                                
                                margin="normal"
                                />
                            
                            
                                <TextField
                                id='password'
                                name='password'
                                required
                                value={values.password}
                                onChange={handleChange}
                                type="password" 
                                label='Password'
                                fullWidth={true}
                                
                                margin="normal"
                                />
                           
                            
                                 <Button
                                    type="submit"
                                    fullWidth={true}
                                    variant="contained"
                                    color="primary"
                                    
                                >
                                    Login
                                </Button>
                        </form>
                    )}
                </Formik>
                    </Grid>

                    <Grid item xs={9}>
                        <Typography>
                            <Link onClick={()=>handleClick('register')}>Don't have an account?</Link>
                        </Typography>
                    </Grid>
                    <Grid item>
                    <GoogleLogin 
                    clientId="1015277451769-lsgovttnajlk8r4tfjj8pdc2f27kptp4.apps.googleusercontent.com"
                    buttonText = 'Login with google'
                    responseType='code'
                    redirectUri='postmessage'
                    onSuccess={responsibleGoogle}
                    onFailure={responsibleGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </Grid>
                </Grid>
           
    )
}





export default Login;