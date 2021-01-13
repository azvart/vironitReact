import React from 'react';
import{useSelector} from 'react-redux';
import { RootState } from './store';

import MainPage from './pages/main';
import CardForm from './components/cardForm';
import Card from './components/card';

const App:React.FC = () =>{
  const type = ["All","Home","Work"];
  const data = useSelector((state:RootState)=>state.data);
  return(
    <MainPage>
      <CardForm types={type} />
      <div>
      <Card card={data.data} />
      </div>
    </MainPage>
  )
}

export default App;
