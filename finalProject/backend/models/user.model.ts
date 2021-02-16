import mongoose,{Schema,Model,Document} from 'mongoose';

export interface User extends Document{
    name:string,
    email:string,
    password:string,
    date:string,
    avatar:string,
    photo:[],
    userName:string
}

export interface UserMode extends Model<User>{

}

const UserSchema:Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'./img/default/cat.jpg'
    },
    date:{
        type:String,
        default: Date.now
    },
    photo:{
        
        type:Array
   
    }
})



const User = mongoose.model('users',UserSchema);

export default User;