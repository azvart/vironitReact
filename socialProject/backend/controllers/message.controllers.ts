import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import verify from '../middleware/verify-token.middleware';
import mongoose from 'mongoose';
import Message from '../models/message.model';
import GlobalMessage from '../models/globalMessage.model';
import Conversation from '../models/conversation.model';


let jwtUser:any = null;

export const TokenVerification = (req:Request,res:Response,next:NextFunction)=>{
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


export const Global =(req:Request,res:Response)=>{
    GlobalMessage.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'from',
                foreignField: '_id',
                as: 'fromObj',
            },
        },
    ])
        .project({
            'fromObj.password': 0,
            'fromObj.__v': 0,
            'fromObj.date': 0,
        })
    .exec((err,messages)=>{
        if(err){
            console.log(err);
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify({message:'Failure'}));
            res.sendStatus(500);
        }else{
            console.log(messages);
            res.send(messages);
        }
    })
}


export const PostGlobal = (req:any,res:Response)=>{
    
    let message = new GlobalMessage({
        from:jwtUser.id,
        body:req.body.body
    });
    console.log(message);
    req.io.sockets.emit('messages',req.body.body);
    
    message.save((err)=>{
        if(err){
            console.log(err);
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify({message:'Failure'}));
            res.sendStatus(500);
        }else{
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify({message:'Success'}));
        }
    });
}


export const GetConversationList =(req:any,res:Response)=>{
    const from = mongoose.Types.ObjectId(jwtUser.id);
    Conversation.aggregate([
        {
        $lookup:{
            from:'users',
            localField:'recipients',
            foreignField:'_id',
            as:'recipientObj',
        },
    },
    ])
    .match({recipients:{$all:[{ $elemMatch: { $eq: from } }] }})
    .project({
        'recipientObj.password':0,
        'recipientObj.__v':0,
        "recipientObj.date":0,
    })
    .exec((err,conversations)=>{
        if(err){
            console.log(err);
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify({message:'Failure'}));
            res.sendStatus(500);
        }else{
            res.send(conversations);
        }
    });
}


export const GetConversation =(req:any,res:Response)=>{
    const user1 = mongoose.Types.ObjectId(jwtUser.id);
    const user2 = mongoose.Types.ObjectId(req.query.userId);

    Message.aggregate([
        {
            $lookup:{
                from:'users',
                localField:'to',
                foreignField:'_id',
                as:'toObj',
            },
        },
        {
            $lookup:{
                from:'users',
                localField:'from',
                foreignField:'_id',
                as:'fromObj',
            },
        },
    ])
    .match({
        $or:[
            { $and: [{ to: user1 }, { from: user2 }] },
            { $and: [{ to: user2 }, { from: user1 }] },
        ],
    })
    .project({
        'toObj.password': 0,
        'toObj.__v': 0,
        'toObj.date': 0,
        'fromObj.password': 0,
        'fromObj.__v': 0,
        'fromObj.date': 0,
    })
    .exec((err,messages)=>{
        if(err){
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
        }else{
            console.log(messages);
            res.send(messages);
        }
    })
}

export const PostPrivateMessgae = (req:any,res:Response)=>{
    const from = mongoose.Types.ObjectId(jwtUser.id);
    const to = mongoose.Types.ObjectId(req.body.to);

    Conversation.findOneAndUpdate(
        {
            recipients:{
                $all:[
                    {$elemMatch:{$eq:from}},
                    {$elemMatch:{$eq:to}},
                ],
            },
        },{
            recipients:[jwtUser.id,req.body.to],
            lastMessage:req.body.body,
            date:Date.now(),
        },
        {upsert:true,new:true,setDefaultsOnInsert:true},
        (err,conversation)=>{
            if(err){
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Failure' }));
                res.sendStatus(500);
            }else{
                const message = new Message({
                    conversation:conversation._id,
                    to:req.body.to,
                    from:jwtUser.id,
                    body:req.body.body,
                });
                console.log(message);
                req.io.sockets.emit('messages',req.body.body);

                message.save((err)=>{
                    if(err){
                        console.log(err);
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Failure' }));
                        res.sendStatus(500);
                    }else{
                        res.setHeader('Content-Type', 'application/json');
                        res.end(
                            JSON.stringify({
                                message: 'Success',
                                conversationId: conversation._id,
                            }));
                    }
                });
            }
        }
    )
}