import React,{useState} from 'react';
import {useDispatch} from 'react-redux';


import {AddItem} from '../store/actions';
type Props={
    types:any
}
const CardForm:React.FC<Props> = ({types}) =>{
    const[data,setData] = useState({
        firstName:'',
        lastName:'',
        text:'',
        setType:"All",
        report:false,
        dataFrom:'',
        dataTo:'',
        id:0
    });
  
    const dispatch = useDispatch();

    const createItem = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>): void=>{
        e.preventDefault();
        setData({...data,id:Math.floor(Math.random()*1000)});
        
         dispatch(
            AddItem(data)
         )
    }

    return(
        <form>
            <div>
            <input 
            type="text" 
            placeholder='First Name'
            value={data.firstName}
            onChange={(e)=>setData({...data,firstName:e.target.value})}
            />
            </div>
            <div>
            <input 
            type="text"
            placeholder ="Last Name"
            value ={data.lastName}
            onChange={(e)=>setData({...data,lastName:e.target.value})}
            />
            </div>
            <div>
                <label>Report</label>
                <input type="checkbox"
                checked={data.report}
                onChange={()=>setData({...data,report:!data.report})}
                />
            </div>
            <div>
                <input type="date"
                value={data.dataFrom}
                onChange={(e)=>setData({...data,dataFrom:e.target.value})}
                />
            </div>
            <div>
                <input 
                type="date"
                value={data.dataTo}
                onChange={(e)=>setData({...data,dataTo:e.target.value})}
                />
            </div>
            <div>
                <textarea 
                value={data.text}
                onChange={(e)=>setData({...data,text:e.target.value})}
                placeholder='Write text'
                >
                </textarea>
            </div>
            <div>
                <select onChange={(e)=>setData({...data,setType:e.target.value})}>
                    {
                        types.map((e:string,index:number)=><option key={index} value={e}>{e}</option>)
                    }
                </select>
            </div>
            <button type='submit' onClick={(e):void=>createItem(e)} >ADD</button>
        </form>
    )
}




export default CardForm;