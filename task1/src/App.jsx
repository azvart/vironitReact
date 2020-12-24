import React from 'react';

import './app.css';

import Cards from './components/cards/cards';
import TodoForm from './components/cardForm/todoform';

class App extends React.Component{
constructor(props){
  super(props);
  this.addTask = this.addTask.bind(this);
  this.deleteTask = this.deleteTask.bind(this);
  this.updateTask = this.updateTask.bind(this);
  this.state ={
    cards:[],
    formOpen:false,
    
  };
 
}

  updateTask(index,data){
    this.state.cards[index] = data;
    this.setState({cards:this.state.cards});
  }
  addTask(newTask){
    
    this.setState({...this.state,cards:[
      ...this.state.cards,
      newTask
    ]});
  }

  deleteTask(index){
    this.setState({
      cards:this.state.cards.filter((_,i)=>i !==index)
    });
  }
  render() {
    return(
       <div className='wrapper'>
          <div className="card_container">
       {this.state.cards.map((e,index)=>{
         return(
         <Cards key={index}
         id={index} 
         firstName={e.firstName} 
         lastName={e.lastName} 
         comment={e.comment} 
         report={e.report}
         email={e.email}
         dataFrom={e.dataFrom}
         dataTo={e.dataTo}
         type={e.type}
         delete={this.deleteTask}
         update={this.updateTask}
         
         />
       )})}
        </div>
       <div className='add_task'>
         <button onClick={()=>this.setState({...this.state, formOpen: !this.state.formOpen})}>
           +
         </button>
       </div>

        {this.state.formOpen && 
          <TodoForm addTask={this.addTask}  />
        }

       </div>
    )
  }

}


export default App;
