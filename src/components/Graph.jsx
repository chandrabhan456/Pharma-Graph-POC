import React, { useState, useEffect } from "react";
import D3Component from "./D3Component";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
const data2 = {
  name: "p002",
  id: "p002",
  group: "Patient",
  children: [
    {
      name: "Revlimid",
      id: "Revlimid",
      group: "New Drug",
      linkType: "USES",
      linkValue: 6.5,
      children: [
        {
          name: "Lenalidomide",
          id: "Lenalidomide",
          group: "Drug Ingredient",
          linkType: "CONTAINS",
          children: [
            {
              name: "Adverse Effects",
              children: [
                {
                  name: "Neutropenia",
                  id: "Neutropenia",
                  group: "Adverse Effect",
                  linkType: "CAUSES_AE",
                  linkValue: 7,
                  children: [],
                },
                {
                  name: "Deep Vein Thrombosis",
                  id: "Deep Vein Thrombosis",
                  group: "Adverse Effect",
                  linkType: "CAUSES_AE",
                  linkValue: 7,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: "Interactions",
          children: [
            {
              name: "Warfarin",
              id: "Warfarin",
              group: "Existing Drug",
              linkType: "INTERACTS_WITH",
              linkValue: 28,
              children: [
                {
                  name: "Adverse Effects",
                  children: [
                    {
                      name: "Bleeding",
                      id: "Bleeding",
                      group: "Adverse Effect",
                      linkType: "CAUSES_AE",
                      linkValue: 6,
                      children: [
                        {
                          name: "Affected Organs",
                          children: [
                            {
                              name: "Heart",
                              id: "Heart",
                              group: "Organ",
                              linkType: "AFFECTS_ORGAN",
                              linkValue: 15,
                              children: [],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Digoxin",
      id: "Digoxin",
      group: "Existing Drug",
      linkType: "TAKES",
      children: [
        {
          name: "Affected Organs",
          children: [
            {
              name: "Heart",
              id: "Heart",
              group: "Organ",
              linkType: "AFFECTS_ORGAN",
              linkValue: 6,
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "Losartan",
      id: "Losartan",
      group: "Existing Drug",
      linkType: "TAKES",
      children: [
        {
          name: "Affected Organs",
          children: [
            {
              name: "Heart",
              id: "Heart",
              group: "Organ",
              linkType: "AFFECTS_ORGAN",
              linkValue: 5,
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "Methotrexate",
      id: "Methotrexate",
      group: "Existing Drug",
      linkType: "TAKES",
      children: [
        {
          name: "Affected Organs",
          children: [
            {
              name: "Heart",
              id: "Heart",
              group: "Organ",
              linkType: "AFFECTS_ORGAN",
              linkValue: 6,
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "Aspirin",
      id: "Aspirin",
      group: "Existing Drug",
      linkType: "TAKES",
      children: [
        {
          name: "Affected Organs",
          children: [
            {
              name: "Heart",
              id: "Heart",
              group: "Organ",
              linkType: "AFFECTS_ORGAN",
              linkValue: 5,
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "Atorvastatin",
      id: "Atorvastatin",
      group: "Existing Drug",
      linkType: "TAKES",
      children: [
        {
          name: "Affected Organs",
          children: [
            {
              name: "Heart",
              id: "Heart",
              group: "Organ",
              linkType: "AFFECTS_ORGAN",
              linkValue: 4,
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "Bisoprolol",
      id: "Bisoprolol",
      group: "Existing Drug",
      linkType: "TAKES",
      children: [
        {
          name: "Affected Organs",
          children: [
            {
              name: "Heart",
              id: "Heart",
              group: "Organ",
              linkType: "AFFECTS_ORGAN",
              linkValue: 4,
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
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

const Graph = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [treeData, setTreeData] = useState({});

  const data = {
    name: "DrugInteractionGraph",
    width: 220,
    height: 50,
    children: [
      {
        name: "Drug",
        width: 160,
        height: 50,
        children: [
          {
            name: "Revlimid (Lenalidomide)",
            width: 180,
            height: 50,
            children: [
              {
                name: "Interactions",
                width: 150,
                height: 45,
                children: [
                  {
                    name: "Drug: Methoxy Polyethylene Glycol-Epoetin Beta",
                    color: "lightcoral",
                    width: 200,
                    height: 40,
                  },
                  {
                    name: "Drug: Estradiol",
                    color: "lightcoral",
                    width: 200,
                    height: 40,
                  },
                  {
                    name: "Drug: Atorvastatin",
                    color: "lightcoral",
                    width: 200,
                    height: 40,
                  },
                  {
                    name: "Drug: Apixaban",
                    color: "lightcoral",
                    width: 200,
                    height: 40,
                  },
                  {
                    name: "Drug: Diphenhydramine",
                    color: "lightcoral",
                    width: 200,
                    height: 40,
                  },
                ],
              },
              {
                name: "SafeCombinations",
                width: 150,
                height: 45,
                children: [
                  {
                    name: "Drug: Glyburide",
                    color: "lightgreen",
                    width: 200,
                    height: 40,
                  },
                  {
                    name: "Drug: Sitagliptin",
                    color: "lightgreen",
                    width: 200,
                    height: 40,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  function addNodeStyles(node, level = 0) {
  return {
    ...node,
    color: levelColors[level % levelColors.length],
    width: 200,
    height: 40,
    children: node.children
      ? node.children.map(child => addNodeStyles(child, level + 1))
      : [],
  };
}


  useEffect(() => {
    // Simulate API call and processing
    // For real API, use fetch/axios then process response.data
    const styledData = addNodeStyles(data2);
    console.log("stlyed data",styledData)
    setTreeData(styledData);
  }, []);
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
  <D3Component data={treeData} />
</div>



      </div>
    </div>
  );
};

export default Graph;
