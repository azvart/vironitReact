
export const Reducer = (state,action)=>{
    switch(action.type){
        case 'ADD_TASK':{
           
            return {
                ...state,
                ...action.payload
            }
        }
    
        case "DELETE_TASK":
            return{
                ...state,
                ...action.payload
                
            }
        case "UPDATE_TASK":
            const{payload} = action;
            return{
                
               ...state,
               data: state.data.map(item=>{
                   if(item.id == payload.id){
                       return payload;
                   }else{
                       return item;
                   }
               })
            
            }

        default:
             return state;
    }
}