import axios from 'axios';


export const GetLists = () => async dispatch=>{
    try{
        const result = await axios.get('https://api.coingecko.com/api/v3/exchanges/list');
        dispatch({
            type:"GET_LIST",
            payload:result
        })
    }catch (e) {
        console.error(e);
    }
}