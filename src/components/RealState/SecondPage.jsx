import React, { useState, useEffect } from "react";
import D3Component from "../D3Component";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";


const SecondPage = () => {
  const { recommendation, setRecommendation, isLoading, setIsLoading } =
    useStateContext();
  const navigate = useNavigate(); // Initialize the navigate function
  const [treeData, setTreeData] = useState({});

  console.log("reeee", recommendation);

  const handlePageChange = () => {
    navigate("/mainpage"); // Navigate to '/secondPage' when the function is called
  };
  const handlePageChange2 = () => {
    navigate("/graph"); // Navigate to '/secondPage' when the function is called
  };
  function getReasoningColor(reasoning) {
  if (!reasoning) return "#222";
  if (reasoning.startsWith("Should not prescribe")) return "#b30000";
  if (reasoning.startsWith("Can be prescribed with close monitoring")) return "#e65c00";
  if (reasoning.startsWith("Safe to prescribe but take care of following side effects")) return "gold"; // or "yellow"
  if (reasoning.startsWith("Safe to prescribe")) return "green";
  return "#222";
}
  return (
    <div style={{ padding: "20px" }}>
      <div
        className="text-blue-500 mt-10 flex cursor-pointer"
        onClick={handlePageChange} // Use the function in the onClick event
      >
        <GoArrowLeft className="text-blue-500 mt-1 ml-1" /> MainPage
      </div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          Loading...
        </div>
      ) : (
        <div
          className="mt-2"
          style={{
            border: "1.5px solid #eee",
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            background: "#fff",
            padding: 32,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h2
            className="text-xl"
            style={{ marginBottom: 10, color: "#304269", fontWeight: 700 }}
          >
            Doctor Recommendation
          </h2>
          <div style={{ marginBottom: 18 }}>
            <span style={{ fontWeight: 500, fontSize: 18 }}>
              Recommendation:{" "}
            </span>
            <p
              style={{
                margin: "6px 0 0 0",
                color: getReasoningColor(recommendation.doctor_recommendation.recommendation),
                lineHeight: 1.7,
                fontWeight: "bold"
              }}
            >
              {recommendation.doctor_recommendation.recommendation}
            </p>
          </div>
            <div style={{ marginBottom: 18 }}>
            <span style={{ fontWeight: 500, fontSize: 18 }}>
              Score:{" "}
            </span>
            <p
              style={{
                margin: "6px 0 0 0",
                color: getReasoningColor(recommendation.doctor_recommendation.recommendation),
                lineHeight: 1.7,
                fontWeight: "bold"
              }}
            >
              {recommendation.doctor_recommendation.score}
            </p>
          </div>

          <div style={{ marginBottom: 18 }}>
            <span style={{ fontWeight: 500 }}>Reasoning:</span>
            <p style={{ margin: "6px 0 0 0", color: "#222", lineHeight: 1.7 }}>
              {recommendation.doctor_recommendation.reasoning}
            </p>
          </div>

          <div style={{ marginBottom: 18 }}>
            <span style={{ fontWeight: 500 }}>Alternative Drugs:</span>
            <ul style={{ margin: "8px 0 0 20px", color: "#25629b" }}>
              {recommendation.doctor_recommendation.alternative_drugs.map(
                (drug, idx) => (
                  <li key={idx}>{drug}</li>
                )
              )}
            </ul>
          </div>

          <div>
            <span style={{ fontWeight: 500 }}>
              Precautions / Monitoring Advice:
            </span>
            <p style={{ margin: "6px 0 0 0", color: "#444" }}>
              {
                recommendation.doctor_recommendation
                  .precautions_or_monitoring_advice
              }
            </p>
          </div>
          <div
            style={{ textAlign: "center", margin: "30px 0" }}
            onClick={handlePageChange2}
          >
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
            <button className="view-graph-btn">📊 View Graph</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondPage;
