import React, { useState, useEffect } from "react";
import D3Component from "./D3Component";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const data1 = {
  recommendation: "Should not prescribe",
  reasoning:
    "Avandia (Rosiglitazone) is associated with an increased risk of heart failure and edema, which are significant concerns given the patient's history of coronary artery disease, myocardial infarction, stable angina, and mild peripheral edema. The patient's BNP is slightly elevated, indicating potential cardiac stress, and the critical path analysis shows a high risk interaction between Rosiglitazone and Isosorbide Mononitrate, further increasing cardiac risk. Additionally, the drug-drug interaction with Metformin poses a risk of hypoglycemia.",
  alternative_drugs: [
    "Pioglitazone",
    "SGLT2 inhibitors (e.g., Empagliflozin)",
    "GLP-1 receptor agonists (e.g., Liraglutide)",
  ],
  precautions_or_monitoring_advice:
    "Monitor cardiac function closely, including BNP levels and signs of heart failure. Consider regular assessment of peripheral edema and renal function. Educate the patient on recognizing symptoms of hypoglycemia and heart failure.",
};
const levelColors = [
  "#e57373", // Level 0 (root)
  "#64b5f6", // Level 1
  "#81c784", // Level 2
  "#ffd54f", // Level 3
  "#ba68c8", // Level 4
  "#ff8a65", // Level 5
  "#90a4ae", // Level 6
  // ...add more colors if your tree is deeper
];

const SecondPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [treeData, setTreeData] = useState({});



 
  const handlePageChange = () => {
    navigate("/mainpage"); // Navigate to '/secondPage' when the function is called
  }; 
  const handlePageChange2 = () => {
    navigate("/graph"); // Navigate to '/secondPage' when the function is called
  };
  return (
    <div style={{ padding: "20px" }}>
      <div
        className="text-blue-500 mt-10 flex cursor-pointer"
        onClick={handlePageChange} // Use the function in the onClick event
      >
        <GoArrowLeft className="text-blue-500 mt-1 ml-1" /> MainPage
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
        <h2 className='text-xl' style={{ marginBottom: 10, color: "#304269", fontWeight: 700 }}>
          Doctor Recommendation
        </h2>
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontWeight: 500, fontSize: 18 }}>
            Recommendation:{" "}
          </span>
          <span style={{ color: "#c0392b", fontWeight: 700, fontSize: 18 }}>
            {data1.recommendation}
          </span>
        </div>

        <div style={{ marginBottom: 18 }}>
          <span style={{ fontWeight: 500 }}>Reasoning:</span>
          <p style={{ margin: "6px 0 0 0", color: "#222", lineHeight: 1.7 }}>
            {data1.reasoning}
          </p>
        </div>

        <div style={{ marginBottom: 18 }}>
          <span style={{ fontWeight: 500 }}>Alternative Drugs:</span>
          <ul style={{ margin: "8px 0 0 20px", color: "#25629b" }}>
            {data1.alternative_drugs.map((drug, idx) => (
              <li key={idx}>{drug}</li>
            ))}
          </ul>
        </div>

        <div>
          <span style={{ fontWeight: 500 }}>
            Precautions / Monitoring Advice:
          </span>
          <p style={{ margin: "6px 0 0 0", color: "#444" }}>
            {data1.precautions_or_monitoring_advice}
          </p>
        </div>
      <div style={{ textAlign: "center", margin: "30px 0" }}   onClick={handlePageChange2} >
  <style>{`
    .view-graph-btn {
      background: linear-gradient(90deg,#4285f4,#34a853);
      color: white;
      border: none;
      border-radius: 24px;
      padding: 12px 32px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(44,62,80,.15);
      transition: background 0.3s, box-shadow 0.2s;
      outline: none;
    }
    .view-graph-btn:hover,
    .view-graph-btn:focus-visible {
      box-shadow: 0 4px 16px rgba(44,62,80,.25);
      filter: brightness(1.05);
    }
  `}</style>
  <button className="view-graph-btn">
    📊 View Graph
  </button>
</div>

    




      </div>
    </div>
  );
};

export default SecondPage;
