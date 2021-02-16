import React from 'react';
import { Router,Route} from 'react-router-dom';

import history from './utils/history';
import PrivateRoute from './utils/privateRoute';
import Chat from './chat/chat';
import {Container} from '@material-ui/core';
import Home from './Home/Home';
const App:React.FC =() =>{


 

  return(
    <Container >
      <Router history={history}>
          <Route path='/' exact component={Home} />
          <PrivateRoute path='/chat' component={Chat} />
      </Router>
    </Container>
  )
}

export default App;


// const PrivateRoute:React.FC<RouteProps> = ({Component,...rest}:any)=>(
//     <Route {...rest}  render={(props:any)=>{
//         const currentUser = authService.currentUserValue;
//         console.log(currentUser);
//         if(!currentUser){
//             return (
//                 <Redirect to={{pathname:'/',state:{from:props.location}}} />
//             );
//         }else{
//             return (<Component {...props} />);
//         }

        
//     }
// }  />
// )