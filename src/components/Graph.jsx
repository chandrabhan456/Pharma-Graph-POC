import React, { useState, useEffect } from "react";
import D3Component from "./D3Component";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import D3DirectedGraph from "./D3DirectedGraph";

const Graph = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [treeData, setTreeData] = useState({});

  const handlePageChange = () => {
    navigate("/secondpage"); // Navigate to '/secondPage' when the function is called
  };
  return (
    <div style={{ padding: "20px" }}>
      <div
        className="text-blue-500 mt-10 flex cursor-pointer"
        onClick={handlePageChange} // Use the function in the onClick event
      >
        <GoArrowLeft className="text-blue-500 mt-1 ml-1" /> Go To Recommandation
      </div>
      <div className="mt-2"
        style={{
          border: "1.5px solid #eee",
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          background: "#fff",
          padding: 32,
          fontFamily: "system-ui, sans-serif",
        }}
      >

      <div
  style={{
    height: "700px",
    overflow: "auto",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "40px", // adjust as needed
  }}
>
  <D3DirectedGraph  />
</div>



      </div>
    </div>
  );
};

export default Graph;
