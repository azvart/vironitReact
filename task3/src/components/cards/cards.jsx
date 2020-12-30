import React from 'react';
import {DeleteTask} from '../../store/actions';
import {connect} from 'react-redux';

const Cards = (props)=>{
    const{data,match,DeleteTaskAction} = props;
   
    const state = data.filter((e)=> `/${e.type}` === match.path);
 
    console.log(state);
    const removeItem=(id)=>{
        DeleteTaskAction(id);
    }
    return(
        <div className="card-container">
                {state.map((e,index)=>{
                    return (<div key={index} className='card'>
                        <div className='card-top'>
                            {e.type}
                            <button className='card-delete' onClick={()=>removeItem(e.id)}>
                                x
                            </button>
                        </div>
                        <div className="card-title">
                            <h3>
                                {e.firstName}
                                {e.lastName}
                            </h3>
                            <p>{e.email}</p>
                        </div>
                        <div className="card-body">
                            {e.comment}
                        </div>
                        <div className="card-report">
                            {e.report? 'Make report':'Dont make report'}
                        </div>
                        <div className="card-time">
                            <span>From: {e.dataFrom}</span>
                            <span>To: {e.dataTo}</span>
                        </div>                        
                    </div>)
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
        DeleteTaskAction:(id)=>dispatch(DeleteTask(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cards);