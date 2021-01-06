import React,{useEffect} from 'react';
import{VictoryChart,VictoryTheme,VictoryLine} from 'victory';
import {GetCryptoGraph} from '../../store/actions/getCryptoChart';
import {connect} from 'react-redux';

const Crypto=(props)=>{
    const{GetCryptoGraph,crypto,match} = props;
    useEffect(()=>{
        
        GetCryptoGraph(match.params.cryptoId,30);
    },[match]);
   
    
    
    
 
    return(
        <div className='col-lg-8'>
            {crypto &&
            <VictoryChart
            theme={VictoryTheme.material}
            >
                <VictoryLine
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                
                   style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"}
                  }}
                  data={crypto.map((e)=>{ return   { x:new Date(e[0]),y:Math.floor(Number(e[1])) }   } ) }
                >

                </VictoryLine>
            </VictoryChart>
}
        </div>
    )
}


const mapStateToProps = (state)=>({
    crypto:state.mainReducer.crypto
  })
export default connect(mapStateToProps,{GetCryptoGraph})(Crypto)