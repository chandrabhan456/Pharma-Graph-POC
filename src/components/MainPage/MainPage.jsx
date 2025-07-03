import React, { useState } from "react";
import "./MainPage.css"; // Import the CSS file
import { useStateContext } from "../../contexts/ContextProvider";

import { useNavigate } from "react-router-dom";
const dummyData = ["p001", "p002", "p003"];

import patient from "../../assets/Patient.png";
const MainPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const {
    recommendation,
    setRecommendation,
    isLoading,
    setIsLoading,
    drugInteraction,
    setDrugInteraction,
  } = useStateContext();
  const [selectedDrug, setSelectedDrug] = useState(dummyData[0]);
  const [inputValue, setInputValue] = useState("");
  const [visibleInputs, setVisibleInputs] = useState(2);
  const [inputValues, setInputValues] = useState(Array(5).fill(""));

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleAddInput = () => {
    if (visibleInputs < 5) {
      setVisibleInputs(visibleInputs + 1);
    }
  };
  const handleDrug = async () => {
    navigate("/drugInteraction");
    console.log("Input values are", inputValues);
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze_drug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient_id: selectedDrug,
          new_drug_name: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      // Parse JSON response
      const data = await response.json();
      console.log("API response", data);

      // Set base64 image (prepend the proper data URL prefix)

      // Set metrics if you want to show them in a table
      if (data) {
        setRecommendation(data);
        console.log("datammmmmm", data);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setDrugInteraction(
        {
  "ddi_bar_graph": {
    "Dizziness": 3,
    "QT prolongation": 8,
    "Increased bleeding risk": 5,
    "Serotonin syndrome": 7,
    "Hypotension": 4
  },
  "ddi_d3_graph": {
    "nodes": [
      {
        "id": "IngredientA",
        "type": "Drug"
      },
      {
        "id": "IngredientB",
        "type": "Drug"
      },
      {
        "id": "IngredientC",
        "type": "Drug"
      },
      {
        "id": "IngredientD",
        "type": "Drug"
      },
      {
        "id": "Dizziness",
        "type": "Adverse Effect"
      },
      {
        "id": "QT prolongation",
        "type": "Adverse Effect"
      },
      {
        "id": "Increased bleeding risk",
        "type": "Adverse Effect"
      },
      {
        "id": "Serotonin syndrome",
        "type": "Adverse Effect"
      },
      {
        "id": "Hypotension",
        "type": "Adverse Effect"
      }
    ],
    "links": [
      {
        "source": "IngredientA",
        "target": "IngredientB",
        "type": "INTERACTS_WITH",
        "value": 3
      },
      {
        "source": "IngredientA",
        "target": "IngredientC",
        "type": "INTERACTS_WITH",
        "value": 8
      },
      {
        "source": "IngredientB",
        "target": "IngredientC",
        "type": "INTERACTS_WITH",
        "value": 5
      },
      {
        "source": "IngredientA",
        "target": "IngredientD",
        "type": "INTERACTS_WITH",
        "value": 7
      },
      {
        "source": "IngredientB",
        "target": "IngredientD",
        "type": "INTERACTS_WITH",
        "value": 4
      },
      {
        "source": "IngredientA",
        "target": "Dizziness",
        "type": "CAUSES_AE",
        "value": 3
      },
      {
        "source": "IngredientB",
        "target": "Dizziness",
        "type": "CAUSES_AE",
        "value": 3
      },
      {
        "source": "IngredientA",
        "target": "QT prolongation",
        "type": "CAUSES_AE",
        "value": 8
      },
      {
        "source": "IngredientC",
        "target": "QT prolongation",
        "type": "CAUSES_AE",
        "value": 8
      },
      {
        "source": "IngredientB",
        "target": "Increased bleeding risk",
        "type": "CAUSES_AE",
        "value": 5
      },
      {
        "source": "IngredientC",
        "target": "Increased bleeding risk",
        "type": "CAUSES_AE",
        "value": 5
      },
      {
        "source": "IngredientA",
        "target": "Serotonin syndrome",
        "type": "CAUSES_AE",
        "value": 7
      },
      {
        "source": "IngredientD",
        "target": "Serotonin syndrome",
        "type": "CAUSES_AE",
        "value": 7
      },
      {
        "source": "IngredientB",
        "target": "Hypotension",
        "type": "CAUSES_AE",
        "value": 4
      },
      {
        "source": "IngredientD",
        "target": "Hypotension",
        "type": "CAUSES_AE",
        "value": 4
      }
    ]
  },
  "ddi_information": {
    "adverse_effects": [
      {
        "adverse_effect": "QT prolongation",
        "adverse_effect_score": 8,
        "adverse_score_reason": "Both ingredients can prolong QT interval, increasing the risk of life-threatening arrhythmias."
      },
      {
        "adverse_effect": "Serotonin syndrome",
        "adverse_effect_score": 7,
        "adverse_score_reason": "Both ingredients increase serotonin levels, potentially leading to severe serotonin syndrome requiring hospitalization."
      },
      {
        "adverse_effect": "Increased bleeding risk",
        "adverse_effect_score": 5,
        "adverse_score_reason": "IngredientB can potentiate the anticoagulant effect of IngredientC, leading to significant bleeding risk."
      },
      {
        "adverse_effect": "Hypotension",
        "adverse_effect_score": 4,
        "adverse_score_reason": "Combined vasodilatory effects can lead to significant hypotension, requiring dose adjustment."
      },
      {
        "adverse_effect": "Dizziness",
        "adverse_effect_score": 3,
        "adverse_score_reason": "Both ingredients can cause CNS depression, leading to dizziness which is common and manageable."
      }
    ]
  }
}
);
    } finally {
      setIsLoading(false);
    }
  };
  const handleButtonClick = async () => {
    navigate("/secondPage"); // Navigate to '/secondPage' when the function is called
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze_drug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient_id: selectedDrug,
          new_drug_name: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      // Parse JSON response
      const data = await response.json();
      console.log("API response", data);

      // Set base64 image (prepend the proper data URL prefix)

      // Set metrics if you want to show them in a table
      if (data) {
        setRecommendation(data);
        console.log("datammmmmm", data);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setRecommendation({
        doctor_recommendation: {
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
        },
        d3_graph_data: {
          nodes: [
            {
              id: "p001",
              label: "Patient",
              group: "patient",
            },
            {
              id: "Avandia",
              label: "New Drug: Avandia",
              group: "new_drug",
            },
            {
              id: "Metformin",
              label: "Existing Drug: Metformin",
              group: "existing_drug",
            },
            {
              id: "Isosorbide Mononitrate",
              label: "Existing Drug: Isosorbide Mononitrate",
              group: "existing_drug",
            },
            {
              id: "Heart failure",
              label: "Adverse Effect: Heart failure",
              group: "adverse_effect",
            },
            {
              id: "Edema",
              label: "Adverse Effect: Edema",
              group: "adverse_effect",
            },
            {
              id: "Hypoglycemia",
              label: "Adverse Effect: Hypoglycemia",
              group: "adverse_effect",
            },
            {
              id: "Heart",
              label: "Organ: Heart",
              group: "organ",
            },
            {
              id: "Peripheral Vascular System",
              label: "Organ: Peripheral Vascular System",
              group: "organ",
            },
            {
              id: "Metabolic System",
              label: "Organ: Metabolic System",
              group: "organ",
            },
            {
              id: "Cardiac",
              label: "Organ: Cardiac",
              group: "organ",
            },
            {
              id: "Rosiglitazone",
              label: "Organ: Cardiac",
              group: "organ",
            },
          ],
          links: [
            {
              source: "Avandia",
              target: "Metformin",
              type: "INTERACTS_WITH",
              value: 12,
            },
            {
              source: "Rosiglitazone",
              target: "Isosorbide Mononitrate",
              type: "INTERACTS_WITH",
              value: 45,
            },
            {
              source: "Rosiglitazone",
              target: "Heart failure",
              type: "CAUSES_AE",
              value: 8,
            },
            {
              source: "Rosiglitazone",
              target: "Edema",
              type: "CAUSES_AE",
              value: 8,
            },
            {
              source: "Metformin",
              target: "Hypoglycemia",
              type: "CAUSES_AE",
              value: 3,
            },
            {
              source: "Heart failure",
              target: "Heart",
              type: "AFFECTS_ORGAN",
              value: 8,
            },
            {
              source: "Edema",
              target: "Peripheral Vascular System",
              type: "AFFECTS_ORGAN",
              value: 8,
            },
            {
              source: "Hypoglycemia",
              target: "Metabolic System",
              type: "AFFECTS_ORGAN",
              value: 3,
            },
            {
              source: "Rosiglitazone",
              target: "Cardiac",
              type: "AFFECTS_ORGAN",
              value: 20.1,
            },
          ],
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="main-page-container mt-[4%] ">
      <div className="main-page-content ml-[10%]">
        <h1 className="main-page-header">
          Drug Interaction and Safety Insights
        </h1>
        <p className="main-page-paragraph">
          Medications play a crucial role in alleviating symptoms and curing
          illnesses, helping individuals regain their health. However, when
          multiple drugs are taken for different conditions, their chemical
          compositions can interact, potentially leading to unintended
          effects—ranging from mild discomfort to life-threatening
          complications. To support informed decision-making, we provide
          real-world statistics on drug-drug interactions and adverse effects,
          as reported to the FDA. Our platform offers a comprehensive view,
          helping you identify:
        </p>
        <ul className="main-page-list">
          <li>Drug combinations that may pose severe risks</li>
          <li>Interactions with mild to moderate effects</li>
        </ul>
        <p className="main-page-paragraph">
          Simply enter the drug you intend to prescribe, and our system will
          conduct a thorough due diligence process, delivering a detailed
          assessment of its interactions.
        </p>
        <p className="font-bold text-xl">Drug Drug Interaction</p>
        <div
          className="input-button-container"
          style={{
            display: "flex",
            flexWrap: "wrap", // Enable wrapping
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {Array.from({ length: visibleInputs }).map((_, index) => (
            <input
              key={index}
              type="text"
              value={inputValues[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Drug ${index + 1}`}
              className="main-page-input"
              style={{
                flex: "0 0 calc(50% - 10px)", // Allow two items per row
                marginRight: index % 2 === 1 ? "0px" : "10px", // No right margin for the second item
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
          ))}
          <div
            style={{
              display: "flex",
              flex: "0 0 100%", // Takes full width to ensure buttons are on a new line
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <button
              onClick={handleAddInput}
              className="main-page-button"
              style={{
                flex: "0 0 auto", // Automatically size based on content
                marginRight: "10px",
                padding: "5px 10px", // Adjust padding for better touch targets
                fontSize: "24px", // Increase font size for emoji visibility
                lineHeight: "1", // Adjust line height to center the emoji
                boxSizing: "border-box",
                background: "none", // Remove default button background
                border: "none", // Remove default button border
                cursor: "pointer",
              }}
            >
              ➕
            </button>
            <button
              className="main-page-button"
              onClick={handleDrug}
              style={{
                flex: "0 0 calc(25% - 10px)", // Same width as inputs
                boxSizing: "border-box",
              }}
            >
              Drug Interaction
            </button>
          </div>
        </div>
        <div class="horizontal-dotted-line"></div>
                <p className="font-bold text-xl mt-2">Doctor Recommandation</p>
        <div className="input-button-container">
          <select
            value={selectedDrug}
            onChange={(e) => setSelectedDrug(e.target.value)}
            className="main-page-dropdown"
            style={{ marginRight: "10px" }}
          >
            {dummyData.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter the drug you need to prescribe"
            className="main-page-input"
            style={{ marginRight: "10px", }}
          />

          <button className="main-page-button" onClick={handleButtonClick}>
            🔄 Real Stats
          </button>
        </div>
        <p className="main-page-paragraph">
          Ensuring safe and effective treatment starts with knowledge and
          vigilance - let us empower you with the insights you need.
        </p>
        <footer className="main-page-footer ">© 2025 NTT DATA, Inc.</footer>
      </div>
      <div className="main-page-image-container">
        <div style={{ textAlign: "center", marginTop: "5px", width: "100%" }}>
          <img
            src={patient}
            alt="Agent Logo"
            style={{
              width: "100%", // Make the image take the full width of the container
              maxWidth: "750px", // You can set a max width to prevent it from getting too large
              height: "auto", // Use auto to maintain aspect ratio while increasing size
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
