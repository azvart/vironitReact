import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import configureStore,{ListAppState} from './store/store';
import {GetAllList} from './store/actions';
import App from './App';

interface Props{
  store:Store<ListAppState>;
}


const Root:React.FC<Props> = props =>{
  return(
    <Provider store={props.store}>
      <App />
    </Provider>
  )
}

const store = configureStore();
store.dispatch(GetAllList());

ReactDOM.render(<Root store={store} />,document.getElementById('root')as HTMLElement);






