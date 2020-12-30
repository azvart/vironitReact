export const State ={
    data:[]
}


export const Reducer=(state = State,action)=>{
    switch(action.type){
        case 'ADD_TASK':
            return {...state,data:[...state.data,action.payload]}
        case 'DELETE_TASK':
            return state.data.filter((e)=> 
                e.id !== action.payload.id
               
                
            )
        default:
            return state;
    }
    
}