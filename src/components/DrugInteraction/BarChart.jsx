import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables, ChartDataLabels);

const getColor = (score) => {
  if (score >= 7) return "#e74c3c";
  if (score >= 5) return "#f39c12";
  if (score >= 3) return "#f7d358";
  return "#27ae60";
};

const legendInfo = [
  { color: "#e74c3c", label: "7-10: High Risk" },
  { color: "#f39c12", label: "5-6: Moderate Risk" },
  { color: "#f7d358", label: "3-5: Low Risk" },
  { color: "#27ae60", label: "0-3: Minimal Risk" },
];

const legendDescription =
  "(Color indicates severity of interaction risk. Red is highest, green is lowest.)";

const BarChart = ({ drugData }) => {
  const labels = Object.keys(drugData);
  const data = Object.values(drugData);
  const maxData = Math.max(...data);
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: data.map(getColor),
        borderColor: data.map(getColor),
        borderWidth: 2,
        // barThickness: 30, // REMOVE THIS LINE
        categoryPercentage: 0.5, // More gap between bars
        barPercentage: 0.5, // Thinner bars
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false, // THIS IS CRITICAL!
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Drug Drug Interaction Risks",
        align: "center",
        font: { size: 20, weight: "bold" },
        padding: { top: 15, bottom: 15 },
      },
      tooltip: { enabled: true },
      datalabels: {
        anchor: "end",
        align: "right",
        color: "#333",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value) => value,
      },
    },
    scales: {
      x: {
      beginAtZero: true,
      max: maxData + 1, // Ensure room for datalabel
      grid: { display: false },
      title: { display: true, text: "Score" },
      ticks: { precision: 0 },
    },
      y: {
        grid: { display: false },
      },
    },
  };

  // Height: 60px per bar, minimum 200px
  const chartHeight = Math.max(labels.length * 60, 200);

  return (
    <div
      style={{
        width: "100%",
        height: Math.max(labels.length * 50, 200), // Adjust 50 as needed
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <Bar
        data={chartData}
        options={chartOptions}
        plugins={[ChartDataLabels]}
      />
      {/* Legend */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {legendInfo.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 24,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                background: item.color,
                border: "1px solid #aaa",
                marginRight: 8,
              }}
            ></div>
            <span style={{ fontSize: 15 }}>{item.label}</span>
          </div>
        ))}
        <span
          style={{
            fontSize: 13,
            fontStyle: "italic",
            marginLeft: 12,
            color: "#666",
          }}
        >
          {legendDescription}
        </span>
      </div>
    </div>
  );
};

export default BarChart;
