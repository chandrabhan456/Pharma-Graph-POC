import React from 'react';
import './MainPage.css'; // Import the CSS file

import { useNavigate } from 'react-router-dom';
import patient from "../assets/Patient.png";
const MainPage = () => {
   const navigate = useNavigate(); // Initialize the navigate function

  const handleButtonClick = () => {
    navigate('/secondPage'); // Navigate to '/secondPage' when the function is called
  };
  return (
    <div className="main-page-container mt-[4%] ">
      <div className="main-page-content ml-[10%]">
        <h1 className="main-page-header">Drug Interaction and Safety Insights</h1>
        <p className="main-page-paragraph">
          Medications play a crucial role in alleviating symptoms and curing illnesses, helping 
          individuals regain their health. However, when multiple drugs are taken for different 
          conditions, their chemical compositions can interact, potentially leading to unintended 
          effects—ranging from mild discomfort to life-threatening complications. To support informed 
          decision-making, we provide real-world statistics on drug-drug interactions and adverse 
          effects, as reported to the FDA. Our platform offers a comprehensive view, helping you 
          identify:
        </p>
        <ul className="main-page-list">
          <li>Drug combinations that may pose severe risks</li>
          <li>Interactions with mild to moderate effects</li>
        </ul>
        <p className="main-page-paragraph">
          Simply enter the drug you intend to prescribe, and our system will conduct a thorough due 
          diligence process, delivering a detailed assessment of its interactions.
        </p>
        <div className="input-button-container ">
          <input 
            type="text" 
            placeholder="Enter the drug you need to prescribe" 
            className="main-page-input"
          />
       <button
            className="main-page-button"
            onClick={handleButtonClick} // Use the function in the onClick event
          >
            🔄 Real Stats
          </button>

        </div>
        <p className="main-page-paragraph">
          Ensuring safe and effective treatment starts with knowledge and vigilance - let us empower 
          you with the insights you need.
        </p>
        <footer className="main-page-footer ">
          © 2025 NTT DATA, Inc.
        </footer>
      </div>
      <div className="main-page-image-container">
      <div style={{ textAlign: "center", marginTop: "5px", width: "100%" }}>
  <img
    src={patient}
    alt="Agent Logo"
    style={{
      width: "100%",  // Make the image take the full width of the container
      maxWidth: "750px",  // You can set a max width to prevent it from getting too large
      height: "auto",  // Use auto to maintain aspect ratio while increasing size
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
