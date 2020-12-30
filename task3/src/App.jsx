import React,{useState} from 'react';
import './app.css';
import {BrowserRouter,Link,Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {AddTask} from './store/actions';

//pages
import LinkPage from './pages/linkPage/linkPage';
import Content from './pages/mainPage/Content';
//components
import CardForm from './components/cardForm/cardForm';
import Cards from './components/cards/cards';




const App =(props)=>{
  const typeSort =['Work','Home',"Another"];

  const{AddTaskAction} = props;

  const[form,setForm] = useState({
    firstName:'',
    lastName:'',
    email:'',
    type:'All',
    comment:'',
    report:false,
    dataFrom:'',
    dataTo:'',
    setType:["Work","Home","Another"],
    
});

  return(
  <BrowserRouter>
      <LinkPage>
        <Link to='/All'>All Task</Link>
        <Link to='/addTask'>Added Task</Link>
        {typeSort.map((e,index)=>{
          return(<Link key={index} to={e}>{e}</Link>)
        })}
      </LinkPage>

      <Content>

        <Switch>
          <Route  path='/All' component={Cards} />
         
          <Route path='/addTask'>
            <CardForm form={form} setForm={setForm} AddTask={AddTaskAction}/>
          </Route>
          {typeSort.map((e,index)=>{
            return <Route key={index} path={`/${e}`} component={Cards}/>
             
          })}
        </Switch>

      </Content>
  </BrowserRouter>
  )
}

const mapDispatchToProps =(dispatch)=>{
  return{
    AddTaskAction:(task)=>dispatch(AddTask(task)),
    
  }
}

const mapStateToProps = (store)=>{
  return{
    data:store.data
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(App);