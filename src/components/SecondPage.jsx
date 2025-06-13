import React from 'react';
import D3Component from './D3Component';

const SecondPage = () => {
 const data = {
  name: "DrugInteractionGraph",
  width: 220, // custom width for root
  children: [
    {
      name: "Drug",
      width: 160, // custom width for this node
      children: [
        {
          name: "Revlimid (Lenalidomide)",
          width: 180,
          children: [
            {
              name: "Interactions",
              radius: 65, // this will be a circle
              children: [
                { name: "Drug: Methoxy Polyethylene Glycol-Epoetin Beta", color: "lightcoral", radius: 60 },
                { name: "Drug: Estradiol", color: "lightcoral", radius: 60 },
                { name: "Drug: Atorvastatin", color: "lightcoral", radius: 60 },
                { name: "Drug: Apixaban", color: "lightcoral", radius: 60},
                { name: "Drug: Diphenhydramine", color: "lightcoral", radius: 60 },
              ],
            },
            {
              name: "SafeCombinations",
              radius: 65,
              children: [
                { name: "Drug: Glyburide", color: "lightgreen", radius: 60 },
                { name: "Drug: Sitagliptin", color: "lightgreen", radius: 60 },
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
