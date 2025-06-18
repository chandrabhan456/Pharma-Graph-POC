import React,{useState,useEffect} from 'react';
import D3Component from './D3Component';
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
const dummyD3GraphData = {
  d3_graph_data: {
    nodes: [
      {
        id: "p001",
        label: "Patient",
        group: "patient"
      },
      {
        id: "Avandia",
        label: "New Drug: Avandia",
        group: "new_drug"
      },
      {
        id: "Metformin",
        label: "Existing Drug: Metformin",
        group: "existing_drug"
      },
      {
        id: "Isosorbide Mononitrate",
        label: "Existing Drug: Isosorbide Mononitrate",
        group: "existing_drug"
      },
      {
        id: "Heart failure",
        label: "Adverse Effect: Heart failure",
        group: "adverse_effect"
      },
      {
        id: "Edema",
        label: "Adverse Effect: Edema",
        group: "adverse_effect"
      },
      {
        id: "Hypoglycemia",
        label: "Adverse Effect: Hypoglycemia",
        group: "adverse_effect"
      },
      {
        id: "Heart",
        label: "Organ: Heart",
        group: "organ"
      },
      {
        id: "Peripheral Vascular System",
        label: "Organ: Peripheral Vascular System",
        group: "organ"
      },
      {
        id: "Metabolic System",
        label: "Organ: Metabolic System",
        group: "organ"
      },
      {
        id: "Cardiac",
        label: "Organ: Cardiac",
        group: "organ"
      }
    ],
    links: [
      {
        source: "Avandia",
        target: "Metformin",
        type: "INTERACTS_WITH",
        value: 12
      },
      {
        source: "Rosiglitazone",
        target: "Isosorbide Mononitrate",
        type: "INTERACTS_WITH",
        value: 45
      },
      {
        source: "Rosiglitazone",
        target: "Heart failure",
        type: "CAUSES_AE",
        value: 8
      },
      {
        source: "Rosiglitazone",
        target: "Edema",
        type: "CAUSES_AE",
        value: 8
      },
      {
        source: "Metformin",
        target: "Hypoglycemia",
        type: "CAUSES_AE",
        value: 3
      },
      {
        source: "Heart failure",
        target: "Heart",
        type: "AFFECTS_ORGAN",
        value: 8
      },
      {
        source: "Edema",
        target: "Peripheral Vascular System",
        type: "AFFECTS_ORGAN",
        value: 8
      },
      {
        source: "Hypoglycemia",
        target: "Metabolic System",
        type: "AFFECTS_ORGAN",
        value: 3
      },
      {
        source: "Rosiglitazone",
        target: "Cardiac",
        type: "AFFECTS_ORGAN",
        value: 20.1
      }
    ]
  }
};

const SecondPage = () => {
    const navigate = useNavigate(); // Initialize the navigate function
  const [treeData, setTreeData] = useState({});
  const dummyData = {
    interactions: [
      { name: "Methoxy Polyethylene Glycol-Epoetin Beta", color: "lightcoral" },
      { name: "Estradiol", color: "gold" },
      { name: "Atorvastatin", color: "mediumseagreen" },
      { name: "Apixaban", color: "darkorange" },
      { name: "Diphenhydramine", color: "deepskyblue" },
      { name: "Glyburide", color: "lightgreen" },
      { name: "Sitagliptin", color: "lightpink" },
    ],
    riskCategories: {
      highRisk: ["Methoxy Polyethylene Glycol-Epoetin Beta", "Estradiol", "Atorvastatin"],
      moderateRisk: ["Apixaban"],
      mildRisk: ["Diphenhydramine"],
      noRisk: ["Glyburide", "Sitagliptin"],
    },
  };
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
                { name: "Drug: Methoxy Polyethylene Glycol-Epoetin Beta", color: "lightcoral", width: 200, height: 40 },
                { name: "Drug: Estradiol", color: "lightcoral", width: 200, height: 40 },
                { name: "Drug: Atorvastatin", color: "lightcoral", width: 200, height: 40 },
                { name: "Drug: Apixaban", color: "lightcoral", width: 200, height: 40 },
                { name: "Drug: Diphenhydramine", color: "lightcoral", width: 200, height: 40 },
              ],
            },
            {
              name: "SafeCombinations",
              width: 150,
              height: 45,
              children: [
                { name: "Drug: Glyburide", color: "lightgreen", width: 200, height: 40 },
                { name: "Drug: Sitagliptin", color: "lightgreen", width: 200, height: 40 },
              ],
            },
          ],
        },
      ],
    },
  ],
};
function buildHierarchy(apiData) {
  // Defensive checks
  if (!apiData || !Array.isArray(apiData.nodes) || !Array.isArray(apiData.links)) {
    return null;
  }

  // Find the new drug
  const newDrug = apiData.nodes.find(n => n.group === "new_drug");
  if (!newDrug) return null;

  // Find all existing drugs
  const existingDrugs = apiData.nodes.filter(n => n.group === "existing_drug");

  // Which existing drugs interact with the new drug?
  const interactsWith = apiData.links
    .filter(l => l.type === "INTERACTS_WITH" && l.source === newDrug.id)
    .map(l => l.target);

  // Interactions children (exactly as in your sample)
  const interactionChildren = existingDrugs
    .filter(d => interactsWith.includes(d.id))
    .map(d => ({
      name: `Drug: ${d.label.replace(/^Existing Drug: /, "")}`,
      color: "lightcoral",
      width: 200,
      height: 40
    }));

  // Safe combinations (no interaction)
  const safeChildren = existingDrugs
    .filter(d => !interactsWith.includes(d.id))
    .map(d => ({
      name: `Drug: ${d.label.replace(/^Existing Drug: /, "")}`,
      color: "lightgreen",
      width: 200,
      height: 40
    }));

  // Return in the exact structure D3Component expects
  return {
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
            name: newDrug.label.replace(/^New Drug: /, ""), // just "Avandia"
            width: 180,
            height: 50,
            children: [
              {
                name: "Interactions",
                width: 150,
                height: 45,
                children: interactionChildren
              },
              {
                name: "SafeCombinations",
                width: 150,
                height: 45,
                children: safeChildren
              }
            ]
          }
        ]
      }
    ]
  };
}


 useEffect(() => {
    async function fetchData() {
      // Replace the URL with your actual API endpoint
    
      const transformed = buildHierarchy(dummyD3GraphData.d3_graph_data);
      setTreeData(transformed);
      console.log("transformed data",transformed)
    }
    fetchData();

  }, []);
  const handlePageChange = () => {
    navigate('/mainpage'); // Navigate to '/secondPage' when the function is called
  };
  return (
    <div style={{ padding: '20px' }}>

        <div
        className="text-blue-500 mt-10 flex cursor-pointer"
         onClick={handlePageChange} // Use the function in the onClick event
      >
        <GoArrowLeft className="text-blue-500 mt-1" /> MainPage
      </div>
      <h2 className='text-4xl mt-2' style={{ textAlign: 'left', marginBottom: '30px' }}>
        Drug Interaction Report for <span style={{ color: 'blue' }}>Revlimid (Lenalidomide)</span>
      </h2>

      <div className='mt-2' style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginRight: '40px' }}>
          <h3 className='text-2xl text-gray-600' style={{ marginBottom: '10px' }}>Drug Interaction</h3>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            {dummyData.interactions.map((interaction, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <span
                  style={{
                    backgroundColor: interaction.color,
                    border: '1px solid black',
                    borderRadius: '50%',
                    width: '12px',
                    height: '12px',
                    display: 'inline-block',
                    marginRight: '10px',
                  }}
                ></span>
                {interaction.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ color: 'red' }}>High-Risk Interactions (Severe Adverse Effects)</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'red' }}>
            {dummyData.riskCategories.highRisk.map((drug, index) => (
              <li key={index} style={{ color: 'black' }}>{drug}</li>
            ))}
          </ul>

          <h3 style={{ color: 'blue' }}>Moderate-Risk Interactions (Potential Complications)</h3>
         <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'blue' }}>
            {dummyData.riskCategories.moderateRisk.map((drug, index) => (
              <li key={index} style={{ color: 'black' }}>{drug}</li>
            ))}
          </ul>

          <h3 style={{ color: 'teal' }}>Mild-Risk Interactions (Minimal Adverse Effects)</h3>
       <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'teal' }}>
            {dummyData.riskCategories.mildRisk.map((drug, index) => (
              <li key={index} style={{ color: 'black' }}>{drug}</li>
            ))}
          </ul>

          <h3 style={{ color: 'green' }}>No Adverse Effects Reported (Safe Combinations)</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'green' }}>
            {dummyData.riskCategories.noRisk.map((drug, index) => (
              <li key={index} style={{ color: 'black' }}>{drug}</li>
            ))}
          </ul>
        </div>
      </div>
        <div
        className="mt-2"
        style={{
          marginTop: '5px',
          width: '80%',
          height: '400px', // Container height
          border: '1px solid #ccc', // Border color and style
          borderRadius: '10px',
          overflowY: 'auto', // Allow vertical scrolling
          overflowX: 'hidden', // Prevent horizontal scrolling
          display: 'flex', // Use flexbox
          justifyContent: 'center', // Center horizontally
          alignItems: 'center',
          marginLeft: 'auto', // Center the container horizontally
          marginRight: 'auto', // Center the container horizontally
        }}
      >
        <div
          style={{
            width: '100%',
            height: '500px', // Content height larger than container
          }}
        >
          <D3Component data={treeData} />
        </div>
        </div>
      </div>
  );
};

export default SecondPage;
