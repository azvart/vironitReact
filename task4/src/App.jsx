import React,{useEffect,useState} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

import {GetLists} from './store/actions/getListAction';
import {connect} from 'react-redux';


import GraphPage from './pages/graphPage';

import Links from './components/links/links';
import Pagination from './components/pagination/pagination';
import Crypto from './components/currentCrypto/crypto';
const App =(props)=>{

const{GetLists,data} = props;

useEffect(()=>{
  GetLists();
},[]);

const[currentPage,setCurrentPage] = useState(1);
const[itemPerPage,setItemPerPage] = useState(10);


const indexOfLastItem = currentPage * itemPerPage;
const indexOfFirstItem = indexOfLastItem  - itemPerPage;

const currentItem = data;

console.log(data);
const paginate =pageNumbers => setCurrentPage(pageNumbers);

  return (
    <BrowserRouter>
        <GraphPage>
          {data && <div className='row'><Links 
            items={currentItem}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            />
             <Switch>
            <Route path='/:cryptoId' component={Crypto} />
            </Switch>
            <Pagination 
            paginate={paginate}
            itemPerPage={itemPerPage}
            totalItem={data.length}
            />
           
            </div>
          }

        </GraphPage>
    </BrowserRouter>
  )
}


const mapStateToProps = (state)=>({
  data:state.mainReducer.data
})

export default connect(mapStateToProps,{GetLists})(App);
