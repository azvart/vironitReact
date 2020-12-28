import React,{useReducer,useState} from 'react';
import {Store} from './store/context';
import {State} from './store/state';
import {Reducer} from './store/reducer';
import './app.css';

import CardPage from './pages/cardPage';
import TodoForm from './components/cardForm/todoform';
import Cards from './components/cards/cards'

const App = ()=>{
  const[state,dispatch] = useReducer(Reducer,State);
  const[formOpen,setformOpen] = useState({
      form:false
});
const[form,setForm]=useState({
      firstName:'',
      lastName:'',
      email:'',
      comment:'',
      dataFrom:'',
      dataTo:'',
      report:false,
      type:'',
      setType:['Work',"Home","Another"],
      open:false,
      id:0
     
      
  });
const addTask = (event,id)=>{
event.preventDefault();
id = form.id;
setForm({...form,id:Math.floor(Math.random()*1000)});

dispatch({
    type:"ADD_TASK",
    payload:{
        
        data:[...state.data, form]
    }
})
}
const deleteTask = (id)=>{
      dispatch({
            type:"DELETE_TASK",
            payload:{
                  data:state.data.filter((e)=> e.id !== id)
            }
      })
}


const updateTask = (newData)=>{

      dispatch({
            type:'UPDATE_TASK',
            payload:newData
      })
}


 return(
   
      <Store.Provider value={{dispatch,state}}>
            <CardPage>
                  {state.data.map((e,index)=><Cards 
                  firstName={e.firstName} 
                  key={index} 
                  id={e.id} 
                  lastName={e.lastName}
                  email={e.email}
                  dataFrom={e.dataFrom}
                  dataTo={e.dataTo}
                  comment={e.comment}
                  report = {e.report}
                  setType={e.setType}
                  type={e.type}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  
                  
                  />)}
               
            </CardPage>

            <div className='add_task'>
         <button onClick={()=>setformOpen({...formOpen,form:!formOpen.form})}>
           +
         </button>
       </div>
            {formOpen.form &&
            <TodoForm addTask={addTask} form={form} change={setForm} />
            }
            
      </Store.Provider>
   
 )
}


export default App;