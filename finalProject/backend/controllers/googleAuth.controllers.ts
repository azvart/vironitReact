import {Request,Response,NextFunction} from 'express';
import User from '../models/user.model';
import {OAuth2Client} from 'google-auth-library';

const client = new OAuth2Client(
    "1015277451769-lsgovttnajlk8r4tfjj8pdc2f27kptp4.apps.googleusercontent.com",
    "7SL9C7m2wJO556BQ6A48FqYP",
    'postmessage'
);

export const getProfileInfo = async (code:any)=>{
    const r = await client.getToken(code);
    const idToken:any = r.tokens.id_token;

   

    const ticket = await client.verifyIdToken({
        idToken,
        audience: "7SL9C7m2wJO556BQ6A48FqYP",
    });

    const payload = ticket.getPayload();
    
    return payload;

}




export const LoginGoogle = async (req:Request,res:Response)=>{
    try{
        const code = req.body.code;
        console.log(code);
        const profile:any = await getProfileInfo(code);
         new User({
            name:profile.name,
            email:profile.email,
            avatar:profile.picture
        }).save();
    }catch(err){
        console.log(err);
    res.status(401).send();
    }
}