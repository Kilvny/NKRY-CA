import { months } from "@/helper/Util";

export const lineChartData = {
  labels: months({ count: 12 }),
  datasets: [
    {
      label: "Income",
      data: [65, 59, 80, 81, 56, 55, 60, 49, 112, 72, 52, 43],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "Profit",
      data: [35, 29, 20, 41, 39, 35, 40, 29, 42, 56, 22, 13],
      fill: false,
      borderColor: "rgb(54, 199, 25)",
      tension: 0.1,
    },
  ],
};

export const doughnutChartData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Transaction Dataset",
      data: [300, 50, 100],
      backgroundColor: ["rgb(255,137,168)", "rgb(178,3,106)", "rgb(165,7,42)"],
      hoverOffset: 4,
    },
  ],
};