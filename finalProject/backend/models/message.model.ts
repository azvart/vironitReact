import mongoose,{Document,Schema,Model} from 'mongoose';

export interface Messages extends Document{
    conversation:any,
    to:string,
    from:string,
    body:string
}

export interface MessagesModel extends Model<Messages>{

}


const MessagesSchema:Schema = new Schema({
    conversation:{
        type:Schema.Types.ObjectId,
        ref:'conversations'
    },
    to:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    from:{
        type:Schema.Types.ObjectId,
        ref:'users',
        
    },
    body:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default: Date.now,
    }
});

const Message = mongoose.model('messages',MessagesSchema);


export default Message;