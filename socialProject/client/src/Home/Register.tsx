import React from 'react';
import {useDispatch} from 'react-redux';
import RegisterAction from '../store/actions/registerAction';
import * as Yup from 'yup';
import {Formik} from 'formik';

import history from '../utils/history';

import {Grid ,TextField ,Typography,Link,Button }from '@material-ui/core';
interface RegisterProps{
    handleClick:any
}



const Register:React.FC<RegisterProps> =({handleClick})=>{
  
    const dispatch = useDispatch();

   

    return(
        <Grid container>
            <Grid item>
            <Typography component='h1' variant='h5' align='center'>Register</Typography>

            <Formik
            initialValues={{
                name:'',
                email:'',
                password:'',
                userName:'',
            }}
            validationSchema={Yup.object().shape({
                name:Yup.string()
                .required("Name is required")
                .max(40,"Name is too long"),
                userName:Yup.string()
                .required("UserName is required")
                .max(40,'UserName adress is too long'),
                email:Yup.string()
                .required("Email is required")
                .max(30,'Email address too long'),
                password:Yup.string()
                .required('Password is required')
                .max(100,'Password too long')
                .min(
                    6,
                    'Password should be at least 6 characters long'
                ),
            })}
            onSubmit={  ( {name,email,password,userName},{setStatus,setSubmitting} 
                )=>{
                setStatus();
                dispatch(RegisterAction(name,email,password,userName));
                const {from}:any = history.location.state || {
                    from:{pathname:'/chat'},
                };
                history.push(from);
            } }

           

            >
                {({
                    handleSubmit,
                    handleChange,
                    values,

                })=>(
                    <form onSubmit={handleSubmit}>
                        
                            <TextField 
                            id='name'
                            name='name'
                            type="text" 
                            className="form-control" 
                            label='Name'
                            value={values.name}
                            onChange={handleChange}
                            fullWidth={true}
                            
                            margin="normal"
                            required={true}
                            />
                             <TextField 
                            id='userName'
                            name='userName'
                            type="text" 
                            className="form-control" 
                            label='User Name'
                            value={values.userName}
                            onChange={handleChange}
                            fullWidth={true}
                            
                            margin="normal"
                            required={true}
                            />
                       
                            <TextField 
                            id='email'
                            name='email'
                            type="email" 
                            className="form-control" 
                            label='Email'
                            value={values.email}
                            onChange={handleChange}
                            fullWidth={true}
                            
                            margin="normal"
                            required={true}
                            />
                        
                        
                            <TextField  
                            id='password'
                            name='password'
                            type="password" 
                            className="form-control" 
                            label='Password'
                            value={values.password}
                            onChange={handleChange}
                            fullWidth={true}
                            
                            margin="normal"
                            required={true}
                            />
                        
                        
                                <Button
                                    type="submit"
                                    fullWidth={true}
                                    variant="contained"
                                    color="primary"
                                    
                                >
                                    Register
                                </Button>
                       
                    </form>
                )}
            </Formik>

            <Link onClick={()=>handleClick('login')}>
                Already have an account?
            </Link>
            </Grid>
  
              




        </Grid>
    )
}






export default Register;