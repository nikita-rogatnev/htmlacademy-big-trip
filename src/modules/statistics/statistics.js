import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment/moment';
import {TravelType} from "../../helpers/utils";

const transportChartCtx = document.querySelector(`.statistic__transport`);
const moneyChartCtx = document.querySelector(`.statistic__money`);
const timeChartCtx = document.querySelector(`.statistic__time-spend`);
const BAR_HEIGHT = 55;

let moneyChart = null;
let transportChart = null;
let timeChart = null;

// TIME SPENT Chart
const getTotalDuration = (data) => {
  let result = {};

  data.forEach((item) => {
    let typeName = `${TravelType[item.type.toUpperCase()]} ${item.type}`;

    const getDuration = (durationRange) => {
      const duration = moment.duration(moment(durationRange[1]).diff(moment(durationRange[0])));
      return duration.days() * 24 + duration.hours() + (duration.minutes() > 30 ? 1 : 0);
    };

    result[typeName] = (!result[typeName]) ? getDuration([item.dateStart, item.dateEnd]) : +getDuration([item.dateStart, item.dateEnd]);
  });

  return {
    labels: Object.keys(result),
    values: Object.values(result),
    title: `TIME SPENT`,
    formatter: (val) => `${val}H`,
  };
};

// MONEY Chart
const getPrice = (data) => {
  let result = {};

  data.forEach((item) => {
    let typeName = `${TravelType[item.type.toUpperCase()]} ${item.type}`;
    if (!result[typeName]) {
      result[typeName] = 0;
    }
    result[typeName] += +item.price;
  });

  return {
    labels: Object.keys(result),
    values: Object.values(result),
    title: `MONEY`,
    formatter: (val) => `€ ${val}`,
  };
};

// TRANSPORT Chart
const getType = (data) => {
  let result = {};

  data.forEach((item) => {
    let typeName = `${TravelType[item.type.toUpperCase()]} ${item.type}`;
    if (result[typeName]) {
      result[typeName]++;
    } else {
      result[typeName] = 1;
    }
  });

  return {
    labels: Object.keys(result),
    values: Object.values(result),
    title: `TRANSPORT`,
    formatter: (val) => `${val}x`,
  };
};

const renderChart = (canvasElement, chartData) => {
  const chart = new Chart(canvasElement, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartData.labels,
      datasets: [{
        data: chartData.values,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: chartData.formatter,
        },
      },
      title: {
        display: true,
        text: chartData.title,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });

  chart.height = BAR_HEIGHT * chartData.values.length;
  return chart;
};

const updateChart = (chart, data) => {
  chart.data.labels = data.labels.map((item) => item.toUpperCase());
  chart.data.datasets[0].data = data.values;
  chart.height = BAR_HEIGHT * data.values.length;
  chart.update();
};

export const renderStatistics = (data) => {
  moneyChart = renderChart(moneyChartCtx, getPrice(data));
  transportChart = renderChart(transportChartCtx, getType(data));
  timeChart = renderChart(timeChartCtx, getTotalDuration(data));
};


export const updateStatistics = (data) => {
  updateChart(moneyChart, getPrice(data));
  updateChart(transportChart, getType(data));
  updateChart(timeChart, getTotalDuration(data));
};

