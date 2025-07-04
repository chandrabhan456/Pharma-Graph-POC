import React, { useEffect, useState } from "react";

import { Link, NavLink, useNavigate, Navigate } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import nttlogo from "../assets/nttdatalogo.svg";

import "./navbar.css";

const Navbar = () => {
  const {
    
    mainPage,
    setMainPage,
    setlogin1
    
  } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setlogin1(false);  // Set login state to false
    navigate('/');         // Navigate to the root path
  };
  return (
    <div >
      <div className="flex justify-between md:mx-0  relative w-full ">
        <div className="flex" style={{marginTop:'-13px'}}>
          <img
            style={{ width: "250px", marginLeft: "-5px", marginTop: "5px" }}
            className=""
            src={nttlogo}
            alt="nttlogo"
          />
          <div
            className="mt-5 text-3xl "
          
            style={{ cursor: "pointer" }}
          >
            Pharma-Graph-Insights
          </div>
        </div>

        <div
          className={`relative inline-flex rounded-full h-2 right-4 top-2.5`}
        >
         
          <div
            style={{ marginLeft: "-30px" }}
            className="flex items-center justify-center mt-1.5 cursor-pointer"
           
          >
          
          
          </div>

       
        </div>
      </div>
    </div>
  );
};

export default Navbar;