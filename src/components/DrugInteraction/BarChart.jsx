import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register the necessary components
Chart.register(...registerables);

const BarChart = ({ drugData }) => {
  // Extract labels and data from the object
  const labels = Object.keys(drugData);
  const data = Object.values(drugData);

  // Set all bars to a bright blue
  const barColor = 'rgba(0, 123, 255, 1)'; // Bootstrap blue, very bright

  const chartData = {
    labels,
    datasets: [
      {
        // label: 'Score', // Omit label if you want to remove legend
        data,
        backgroundColor: Array(labels.length).fill(barColor),
        borderColor: Array(labels.length).fill(barColor),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false // Hide the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        title: {
          display: true,
          text: 'Score',
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
