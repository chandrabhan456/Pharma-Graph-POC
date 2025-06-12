import React from 'react';
import D3Component from './D3Component';

const SecondPage = () => {
  const data = {
    name: "DrugInteractionGraph",
    children: [
      {
        name: "Drug",
        children: [
          {
            name: "Revlimid (Lenalidomide)",
            children: [
              {
                name: "Interactions",
                children: [
                  { name: "Drug: Methoxy Polyethylene Glycol-Epoetin Beta", color: "lightcoral" },
                  { name: "Drug: Estradiol", color: "lightcoral" },
                  { name: "Drug: Atorvastatin", color: "lightcoral" },
                  { name: "Drug: Apixaban", color: "lightcoral" },
                  { name: "Drug: Diphenhydramine", color: "lightcoral" },
                ],
              },
              {
                name: "SafeCombinations",
                children: [
                  { name: "Drug: Glyburide", color: "lightgreen" },
                  { name: "Drug: Sitagliptin", color: "lightgreen" },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Drug Interaction Graph</h2>
      <D3Component data={data} />
    </div>
  );
};

export default SecondPage;
