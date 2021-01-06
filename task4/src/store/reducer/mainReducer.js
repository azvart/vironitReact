const DataState ={
    
}


export default function(state=DataState,action){
    switch(action.type){
        case "GET_LIST":
            return{
                ...state,
                ...action.payload
            }
        case "GET_CRYPTO":
            return{
                ...state,
                ...action.payload
            }
        default: return state;
    }
}