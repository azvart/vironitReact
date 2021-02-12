import mongoose,{Schema,Model,Document} from 'mongoose';

export interface User extends Document{
    name:string,
    email:string,
    password:string,
    date:string,
    avatar:string
}

export interface UserMode extends Model<User>{

}

const UserSchema:Schema = new Schema({
    name:{
        type:String,
        required:true
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
    }
})

const User = mongoose.model('users',UserSchema);

export default User;