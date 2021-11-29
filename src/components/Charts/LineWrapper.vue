<template>
  <line-chart :chart-data='chartData'></line-chart>
</template>

<script>
import LineChart from './LineChart';

export default {
  name: 'LineWrapper',
  components: {
    LineChart,
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
        fill: 'start',
        labels: this.labels,
        datasets: this.datasets,
      };
    },
  },
};
</script>

<style scoped></style>
