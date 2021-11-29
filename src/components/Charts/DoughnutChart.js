import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  data: () => ({
    options: {
      cutoutPercentage: 65,
      rotation: -1.45 * Math.PI,
      responsive: true,
      legend: {
        position: 'top',
        display: false,
      },
    },
  }),
  props: ['chartData'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
