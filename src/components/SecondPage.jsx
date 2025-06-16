import React from 'react';
import D3Component from './D3Component';
const SecondPage = () => {
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
  return (
    <div style={{ padding: '20px' }}>
      <h2 className='text-4xl' style={{ textAlign: 'left', marginBottom: '30px' }}>
        Drug Interaction Report for <span style={{ color: 'blue' }}>Revlimid (Lenalidomide)</span>
      </h2>

      <div className='mt-10' style={{ display: 'flex', justifyContent: 'center' }}>
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
          <D3Component data={data} />
        </div>
        </div>
      </div>
  );
};

export default SecondPage;
