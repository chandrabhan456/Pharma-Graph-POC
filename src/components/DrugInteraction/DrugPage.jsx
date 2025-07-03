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
  function getScoreColor(score) {
    if (score >= 8) return "#e53935"; // red
    if (score >= 6) return "#fb8c00"; // orange
    if (score >= 4) return "#fbc02d"; // yellow
    if (score >= 2) return "#43a047"; // green
    return "#1e88e5"; // blue
  }
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
            }}
          >
            {/* Bar Chart */}
            <div style={{ flex: "0 0 40%", paddingRight: "10px" }}>
              <BarChart drugData={drugInteraction.ddi_bar_graph} />
            </div>

            {/* Separation Line */}
            <div
              style={{
                marginLeft: "0px",
                borderLeft: "1px solid lightgrey",
                height: "auto",
              }}
            ></div>

            {/* Text Description */}
            <div
              style={{
                flex: "0 0 60%",
                paddingLeft: "0px",
                maxWidth: 600,
                wordBreak: "break-word",
              }}
            >
              <h2 className="text-xl font-bold text-blue-400">
                Drug Interaction Analysis
              </h2>
              <ul style={{ listStyle: "disc", paddingLeft: "24px" }}>
                {drugInteraction.ddi_information.adverse_effects.map(
                  (effect, idx) => (
                    <li key={idx} style={{ marginBottom: "18px" }}>
                      <span style={{ fontWeight: "bold" }}>
                        {effect.adverse_effect}
                      </span>
                      <span
                        style={{
                          background: getScoreColor(
                            effect.adverse_effect_score
                          ),
                          color: "#fff",
                          borderRadius: "12px",
                          fontSize: "0.92em",
                          padding: "2px 10px",
                          marginLeft: "8px",
                          verticalAlign: "middle",
                          display: "inline-block",
                        }}
                      >
                        {effect.adverse_effect_score}
                      </span>
                      <div
                        style={{
                          fontSize: "0.96em",
                          color: "#444",
                          marginTop: "4px",
                          marginLeft: "4px",
                        }}
                      >
                        {effect.adverse_score_reason}
                      </div>
                    </li>
                  )
                )}
              </ul>
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
