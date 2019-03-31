import Chart from "chart.js";

export const renderChart = (ctx, options) => {
  return new Chart(ctx, options);
};
