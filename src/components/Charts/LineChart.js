import { Line } from 'vue-chartjs';
import format from 'date-fns/format';

export default {
  extends: Line,
  props: {
    chartData: {
      type: null,
    },
    isHours: {
      type: Boolean,
    },
  },
  computed: {
    options() {
      const { isHours } = this;
      return {
        responsive: true,
        aspectRatio: 1.75,
        tooltips: {
          callbacks: {
            label({ datasetIndex, index }, data) {
              const value = data.datasets[datasetIndex].data[index];
              // eslint-disable-next-line no-sequences
              return `${format(new Date(value.x), 'h aaa')}`;
            },
          }, // end callbacks:
        }, // end tooltips
        scales: {
          yAxes: [
            {
              gridLines: { borderDash: [2, 2] },
              ticks: {
                // suggestedMax: 27000,
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
          xAxes: [
            {
              type: 'time',
              time: {
                unit: isHours === true ? 'hour' : 'day',
                // isoWeekday: true,
                displayFormats: {
                  day: 'ddd DD',
                  hour: 'hA',
                },
              },
              gridLines: {
                // display: false,
                drawBorder: false,
              },
              ticks: {
                padding: 10,
              },
            },
          ],
        },
        // responsive: true,
        legend: {
          display: false,
        },
      };
    },
  },
  mounted() {
    this.$refs.canvas.height = 120;
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(900, 0, 900, 400);
    this.gradient.addColorStop(0, 'rgba(90, 11, 77, 0.20)');
    this.gradient.addColorStop(1, 'rgba(255,255,255, 0)');

    this.renderChart(
      {
        ...this.chartData,
        datasets: [
          {
            ...this.chartData.datasets[0],
            backgroundColor: this.gradient,
          },
        ],
      },
      this.options,
    );
  },
};
