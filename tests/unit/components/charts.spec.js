import { mount } from '@vue/test-utils';
import LineChart from '../../../src/components/Charts/LineChart';

describe('LineChart', () => {
  it('should mount', () => {
    LineChart.computed.options();
    const mockThis = {
      chartData: {
        datasets: [
          { data: [1, 2, 3] },
        ],
      },
      renderChart: jest.fn(),
      $refs: {
        canvas: {
          getContext: () => ({
            createLinearGradient: () => ({
              addColorStop: jest.fn(),
            }),
          }),
        },
      },
    };
    LineChart.mounted.call(mockThis);
  });
});
