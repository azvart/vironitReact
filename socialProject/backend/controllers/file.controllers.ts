import {Request,Response,NextFunction} from 'express';
import User from '../models/user.model';

import jwt from 'jsonwebtoken';
import verify from '../middleware/verify-token.middleware';
let jwtUser:any = null;
export const FileTokenVerification = (req:Request,res:Response,next:NextFunction)=>{
    try{
         jwtUser = jwt.verify(verify(req),'vironit');
        if(!jwtUser){
            console.log("Error");
        }
        next();
    }catch(err){
        console.log(err);
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify({message:'Unauthorized'}));
        res.sendStatus(401);
    }
}


export const UploadPhoto = async (req:any,res:Response)=>{
    try{
        const file = req.file.filename;
    await User.findOneAndUpdate({_id:req.params.id},{$push:{photo:file}},{   new: true,
            upsert: true,
            setDefaultsOnInsert: true});



    }catch(err){
        res.status(500).send({
            upload_error:'Error uploading files'
        })
    }

}



