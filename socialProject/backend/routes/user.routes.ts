import express from 'express';
import {LoginUser,RegisterUser,GettingUsers,GetCurrentUser} from '../controllers/user.controller';


const userRouter = express.Router();

userRouter
.get('/',GettingUsers)
.post('/login',LoginUser)
.post('/register',RegisterUser)
.get('/user',GetCurrentUser)



export default userRouter;



