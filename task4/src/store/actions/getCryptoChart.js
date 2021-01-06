import axios from 'axios';



export const GetCryptoGraph = (id,days) => async dispatch => {
    try{
            const result = await axios.get(`https://api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=${days}`);
            dispatch({
                type:"GET_CRYPTO",
                payload:{
                    crypto:result.data
                }
            })
        }catch (e) {
        console.error(e);
    }
}