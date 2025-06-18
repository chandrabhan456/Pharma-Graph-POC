import { useState } from 'react'
import './App.css'
import Login from "./views/Login";


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar,  Sidebar} from './views';
import { useStateContext } from './contexts/ContextProvider.jsx';
import {MainPage,SecondPage,Graph} from './components'
function App() {
   localStorage.setItem('OpenAI_Configuration',true)
  localStorage.removeItem("login");
  const {mainPage,login1,setlogin1} = useStateContext();



  return (<div >

<BrowserRouter future={{ v7_startTransition: true,v7_relativeSplatPath:true }}>
  {!login1 ? (
    <Login />
  ) : (
    <div className="flex flex-col min-h-screen">
      
      {/* Navbar - Full Width at Top */}
      <div className="fixed top-0 left-0 w-full  z-50 shadow-md custom-navbar">
        <Navbar />
      </div>

      {/* Sidebar & Content Container (Below Navbar) */}
      <div className="flex flex-row mt-12">
        {/* Sidebar - Fixed on Left */}
        {<div className="w-80 h-screen fixed left-0 top-12 bg-gray-100 ">
          <Sidebar />
        </div>}
        
     {/* Main Content - Takes Remaining Space */}
 <div className={`transition-all duration-300 w-full overflow-x-hidden ml-80`}>
  <Routes>
    
  
      <>
      
        <Route path="/" element={<MainPage />} />
         <Route path="/mainpage" element={<MainPage />} />
         <Route path="/secondPage" element={<SecondPage />} />
           <Route path="/graph" element={<Graph />} />
      
      </>
   

    {/* Documentation routes */}
    
  </Routes>
</div>

      </div>
    </div>
  )}
</BrowserRouter>

</div>  )
}

export default App
