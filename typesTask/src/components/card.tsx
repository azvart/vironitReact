import React from 'react';
import {Data} from '../store/types';
import {useDispatch} from 'react-redux';
import {DeleteItem} from '../store/actions';
type Props = {
    card:any
}

const Card:React.FC<Props> =({card})=>{
    const dispatch = useDispatch();
    const deleteI = (r:React.MouseEvent<HTMLButtonElement, MouseEvent>,id:number):void =>{
        dispatch(
        DeleteItem(id)
        )
    }
    return(
        <div>
            {card.map((e:Data)=><div key={e.id}>
                <h1>{e.firstName}{e.lastName}</h1>
                <p>{e.text}</p>
                <p>{e.report ? 'Make report':'Dont make report'}</p>
                <p>{e.dataFrom}</p>
                <p>{e.dataTo}</p>
                <p>{e.setType}</p>
                <div>
                    
                    <button onClick={(r):void=>deleteI(r,e.id)}>Delete</button>
                </div>
            </div>)}
        </div>
    )
}





export default Card;