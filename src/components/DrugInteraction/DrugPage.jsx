import React from "react";
import BarChart from "./BarChart"; // Adjust the import path as necessary
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

const DrugPage = () => {
  const { isLoading, drugInteraction } = useStateContext();
  const navigate = useNavigate();

  const handlePageChange = () => {
    navigate("/mainpage");
  };

  const handlePageChange2 = () => {
    navigate("/graph2");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        className="text-blue-500 mt-10 flex cursor-pointer"
        onClick={handlePageChange}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
            {/* Bar Chart */}
            <div style={{ flex: '0 0 40%', paddingRight: '10px' }}>
              <BarChart drugData={drugInteraction.drugData.data} />
            </div>

            {/* Separation Line */}
            <div style={{  marginLeft: '70px', borderLeft: '1px solid lightgrey', height: 'auto' }}></div>

            {/* Text Description */}
            <div style={{ flex: '0 0 60%', paddingLeft: '70px' }}>
              <h2>Drug Interaction Analysis</h2>
              <p>
                Avandia (Rosiglitazone) is associated with an increased risk of heart failure and edema...
              </p>
              <p><strong>Recommendation:</strong> Should not prescribe</p>
              <p><strong>Reasoning:</strong> The patient's BNP is slightly elevated, indicating potential cardiac stress...</p>
              <p><strong>Alternative Drugs:</strong> Pioglitazone, SGLT2 inhibitors, GLP-1 receptor agonists</p>
              <p><strong>Precautions:</strong> Monitor cardiac function closely...</p>
            </div>
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

export default DrugPage;
