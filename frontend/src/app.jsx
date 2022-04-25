import React from 'react';

import Apiservices  from './Services/ApiServices';
import SideBar from './Components/SideBar/SideBar';
import ClientInfo from "./Components/ClientInfo/ClientInfo";


function App() {
  
  return (
    <>
    <Apiservices>     
          <SideBar/>
            <ClientInfo/>
    </Apiservices>
    </>
  );
}
export default App;

