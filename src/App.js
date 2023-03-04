import React, { useContext} from "react";
import { Route, Routes } from "react-router-dom";
import {Header, MainContainer, CreateContainer} from './components';
import AuthContext from "./components/Context/AuthContext";


const App = () => {

 
 let context = useContext(AuthContext);

   return (

        <div className="w-screen bg-primary flex flex-col h-auto">
          <Header />
          <div className="mt-14 py-4 px-4 md:px-16 md:mt-20 w-full ">
              <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/createItem" element={<CreateContainer fetchData={context.fetchData} />} />
              </Routes>
          </div>

        </div>
     
  );
};

export default App;
