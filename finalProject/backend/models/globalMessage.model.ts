import mongoose,{Document,Model,Schema} from 'mongoose';



export interface Global extends Document{
    from:any,
    body:any,

}

export interface GlobalModel extends Model<Global>{

}



const GlobalSchema:Schema = new Schema({
    form:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    body:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default: Date.now
    }
});


const GlobalMessage = mongoose.model('global_messages',GlobalSchema);

export default GlobalMessage;

