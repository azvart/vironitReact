import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as socket from 'socket.io';
import userRouter from './routes/user.routes';
import messageRouter from './routes/message.routes';
import googleAuth from './routes/google-auth.routes';
import Gallery from './routes/file.routes';


//Server PORT
const port = 5000;
const app = express();
//SERVER listenning
const server = app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

//Socket initialise

const io:socket.Server = new socket.Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
}); 



//Connected DB
 mongoose.connect('mongodb://localhost:27017/finalProject',{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>{
    console.log("MongoDB successfull Connected");
})
.catch((err)=>console.log(err));






//Body-parser middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//CORS middleware
app.use(cors());


//Socket
app.use((req:any,res,next)=>{
    req.io = io;
    next();
});



//Routes

app.use(userRouter);
app.use(messageRouter);
app.use(Gallery);
app.use(googleAuth);