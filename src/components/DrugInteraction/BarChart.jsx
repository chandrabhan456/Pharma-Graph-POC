import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables, ChartDataLabels);

function getColor(score) {
  if (score >= 7) return "#e74c3c"; // Red
  if (score >= 5) return "#f39c12"; // Orange
  if (score >= 3) return "#f7d358"; // Yellow
  return "#27ae60"; // Green
}

const BarChart = ({ drugData }) => {
  const labels = Object.keys(drugData);
  const data = Object.values(drugData);

  const maxValue = Math.max(...data);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: data.map(getColor),
        borderColor: data.map(getColor),
        borderWidth: 2,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
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
        font: { weight: "bold", size: 14 },
        formatter: (value) => value,
        clamp: true,
        clip: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        max: maxValue + 1,
        grid: { display: false },
        title: { display: true, text: "Score" },
        ticks: { precision: 0 },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "auto" }}>
      <Bar data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />

      {/* Legend */}
      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        {labels.map((label, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                background: getColor(data[i]),
                border: "1px solid #aaa",
                marginRight: 8,
              }}
            ></div>
            <span style={{ fontSize: 15 }}>
              {label}: {data[i]}
            </span>
          </div>
        ))}
        <span style={{ fontSize: 13, fontStyle: "italic", marginTop: 8, color: "#666" }}>
          (Color indicates severity of interaction risk. Red is highest, green is lowest.)
        </span>
      </div>
    </div>
  );
};

export default BarChart;
