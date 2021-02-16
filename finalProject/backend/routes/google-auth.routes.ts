import express from 'express';
import {LoginGoogle} from '../controllers/googleAuth.controllers';


const googleAuth = express.Router();


googleAuth.post('/google',LoginGoogle);



export default googleAuth;