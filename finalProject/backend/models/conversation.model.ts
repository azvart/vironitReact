import mongoose,{Document,Model,Schema} from 'mongoose';


export interface Conversations extends Document{
    recipients:[],
    lastMessage:string,
}

export interface ConversationsModel extends Model<Conversations>{

}

const ConversationsSchema:Schema = new Schema({
    recipients:[
        {
            type:Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    lastMessage:{
        type:String
    },
    date:{
        type:String,
        default: Date.now
    }
});

const Conversation = mongoose.model('conversations',ConversationsSchema);
export default Conversation;