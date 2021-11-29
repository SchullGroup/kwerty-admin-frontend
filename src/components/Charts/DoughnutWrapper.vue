<template>
  <div>
    <doughnut-chart
      :chart-data="chartData"
    ></doughnut-chart>
  </div>
</template>

<script>
import DoughnutChart from './DoughnutChart';

export default {
  name: 'KDoughnutWrapper',
  components: {
    DoughnutChart,
  },
  props: {
    labels: {
      type: Array,
    },
    datasets: {
      type: Array,
    },
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: this.datasets,
      };
    },
  },
};
</script>

<style scoped></style>
