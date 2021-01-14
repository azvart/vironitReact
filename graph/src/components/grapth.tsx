import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {VictoryChart,VictoryTheme,VictoryLine,} from 'victory';
type Props ={
    match:any
}
type Data = {
    crypto:any
}
const defaultCrypto:Data[] = [];
const Graph:React.FC<Props> = ({match}) =>{
    const[crypto,setCrypto]:[Data[],(crypto:Data[])=>void] = useState(defaultCrypto);
 
    useEffect(()=>{
            axios
            .get<Data[]>(`https://api.coingecko.com/api/v3/exchanges/${match.params.cryptoId}/volume_chart?days=30`)
            .then(response=>{
                setCrypto(response.data);
            })

    },[crypto]);
    return(
        <div className='col-lg-7'>
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine 
                animate={{duration:2000,onLoad:{duration:1000}}}
                style={{data:{stroke:"#c43a31"},parent:{border:"1px solid #ccc"}}}
                data={crypto.map((e:any)=>{return {x:new Date(e[0]),y:Math.floor(Number(e[1]))}})}
                >

                </VictoryLine>
            </VictoryChart>
        </div>
    )
}



export default Graph;