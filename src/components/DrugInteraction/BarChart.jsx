import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register the necessary components
Chart.register(...registerables);

const BarChart = ({ drugData }) => {
  // Prepare the data for the chart
  const chartData = {
    labels: drugData.map(drug => drug.name),
    datasets: [
      {
        label: 'Drug Score',
        data: drugData.map(drug => drug.score),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false // Hides the grid lines on the x-axis
        }
      },
      y: {
        grid: {
          display: false // Hides the grid lines on the y-axis
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
