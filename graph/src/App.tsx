import React,{useState} from 'react';
import Item from './components/list';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {rootReducer} from './store/store';
import {useSelector} from 'react-redux';

import MainPage from './pages/Main';
import Graph from './components/grapth';
import Pagination from './components/pagination';



const App:React.FC = () =>{

  const [currentPage,setCurrentPage] = useState(1);
  const [itemPerPage,setItemPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const paginate = (pageNumber:number):void => {return setCurrentPage(pageNumber)};
  type RootState = ReturnType<typeof rootReducer>;
  const data = useSelector((state:RootState)=>state.list.list);
  
  return(
        <MainPage>
          <div className='row'>
          <BrowserRouter>
            <div className='col-lg-5'>
            <Item 
          items={data}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          />
          <Pagination
          paginate={paginate}
          itemPerPage={itemPerPage}
          totalItem={data.length}
          />
          </div>


          <Switch>
            <Route path='/:cryptoId' component={Graph} />
          </Switch>
          </BrowserRouter>
          </div>
        </MainPage>
      
  )
}

export default App;
