<template>
  <line-chart :chart-data='chartData' :isHours="isHours"></line-chart>
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
    isHours: {
      type: Boolean,
      default: false,
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
