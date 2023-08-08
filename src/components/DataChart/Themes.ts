import { ChartConfiguration } from "chart.js";

export const lightOptions: ChartConfiguration["options"] = {
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "#d3d3d3",
      },
    },
    x: {
      grid: {
        color: "#d3d3d3",
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#000000",
      },
    },
  },
};

export const darkOptions: ChartConfiguration["options"] = {
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "#4f4f4f",
      },
      ticks: {
        color: "#ffffff",
      },
    },
    x: {
      grid: {
        color: "#4f4f4f",
      },
      ticks: {
        color: "#ffffff",
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#ffffff",
      },
    },
  },
};