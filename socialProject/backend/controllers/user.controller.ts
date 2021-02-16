import e, {Request,Response,NextFunction} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verify from '../middleware/verify-token.middleware';
import User from '../models/user.model';
import mongoose from 'mongoose';

export const GetCurrentUser = (req:Request,res:Response)=>{
    try{
        const jwtUser:any = jwt.verify(verify(req),'vironit');
        const id = mongoose.Types.ObjectId(jwtUser.id);
        User.findById({_id:id}).exec((err,user)=>{
            if(err){
                console.log(err);
                res.setHeader('Content-Type','application/json');
                res.end(JSON.stringify({message:'Failure'}));
                res.sendStatus(500);
            }else{
                res.send(user);
            }
        })
    }catch(err){
        res.setHeader("Content-Type",'application/json');
        res.end(JSON.stringify({message:"Unauthorized"}));
        res.sendStatus(401);
    }
}

export const GettingUsers =(req:Request,res:Response)=>{
    try{
        const jwtUser:any= jwt.verify(verify(req),'vironit');
        const id = mongoose.Types.ObjectId(jwtUser.id);
        User.aggregate()
        .match({_id:{$not:{$eq:id}}})
        .project({
            password:0,
            __v:0,
            date:0
        })
        .exec((err,users)=>{
            if(err){
                console.log(err);
                res.setHeader('Content-Type','application/json');
                res.end(JSON.stringify({message:'Failure'}));
                res.sendStatus(500);
            }else{
                res.send(users);
            }
        })
    }catch(err){
        res.setHeader("Content-Type",'application/json');
        res.end(JSON.stringify({message:"Unauthorized"}));
        res.sendStatus(401);
    }
}


export const RegisterUser = (req:any,res:Response)=>{
    User.findOne({name:req.body.name,email:req.body.email,userName:req.body.userName}).then((user)=>{
        if(user){
            return res.status(400).json({message:"Username or email already exist"});
        }else{
            const newUser:any = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                userName:req.body.userName
            });
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then((user:any)=>{
                        const payload ={
                            id:user.id,
                            name:user.name,
                        };
                        jwt.sign(
                            payload,
                            'vironit',
                            {
                                expiresIn: 10000000,
                            },
                            (err,token)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    req.io.sockets.emit('users',user.name);
                                    res.json({
                                        success:true,
                                        token: "Bearer " + token,
                                        name: user.name,
                                        userName:user.userName,
                                        userId:user._id,
                                    });
                                }
                            }
                        );
                    })
                    .catch((err:any)=>console.error(err));
                });
            });
        }
    })
}



export const LoginUser = (req:any,res:Response)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email}).then((user:any)=>{
        if(!user){
            return res.status(404).json({emailnotfound:"Email not found"});
        }
        bcrypt.compare(password,user.password).then((isMatch)=>{
            if(isMatch){
                const payload={
                    id:user.id,
                    name:user.name,
                };
                jwt.sign(
                    payload,
                    'vironit',
                    {
                        expiresIn: 10000000,
                    },
                    (err,token)=>{
                        res.json({
                            success:true,
                            token: "Bearer " + token,
                            name:user.name,
                            userName:user.userName,
                            userId:user._id,
                        });
                    }
                );
            }else{
                return res
                .status(400)
                .json({passwordIncorrect:"Password incorrect"});
            }
        });
    });
};

