import React from 'react';
import {DeleteTask,UpdateTask} from '../../store/actions';
import {connect} from 'react-redux';
import './cards.css';
import Card from './card/card';

const Cards = (props)=>{
    const{data,match,DeleteTaskAction,UpdateTaskAction} = props;
   
    const state = data.filter((e)=> `/${e.type}` === match.path);
 
    
   
    const removeItem=(id)=>{
        DeleteTaskAction(id);
        console.log(data);
    }
    return(
        <div className="card-container">
                {state.map((e,index)=>{
                    return <Card key={index}
                    firstName={e.firstName} 
                    lastName={e.lastName} 
                    email={e.email} 
                    type={e.type} 
                    comment={e.comment} 
                    removeItem={removeItem}
                    report={e.report}
                    dataFrom={e.dataFrom}
                    dataTo={e.dataTo}
                    id={e.id}
                    updateTask={UpdateTaskAction}
                    
                    />
                    
                    
                })}
        </div>
    )
}





const mapStateToProps = (store)=>{
    return{
      data:store.data
    }
  }

const mapDispatchToProps = (dispatch)=>{
    return{
        DeleteTaskAction:(id)=>dispatch(DeleteTask(id)),
        UpdateTaskAction:(newData)=>dispatch(UpdateTask(newData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cards);