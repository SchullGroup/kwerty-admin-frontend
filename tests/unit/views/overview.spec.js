import { shallowMount } from '@vue/test-utils';
import Overview from '@/views/Overview/Overview.vue';
import OverviewTable from '@/views/Overview/TableRow.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

// const $route = {
//   query: {
//     active: 'published',
//   },
// };

const tryThis = {
  Profile: {
    firstName: 'some name',
  },
  chartDataset: [
    {
      category: 'economy',
      count: '2',
    },
    {
      category: 'economy',
      count: '2',
    },
  ],
  lineDatasets: [
    {
      category: '1',
      count: '23-06-2022',
    },
    {
      count: '1',
      dateTrunc: '22-06-2022',
    },
    {
      category: '1',
      count: '23-06-2022',
    },
  ],
};

const mockThis = {
  getDashBoardAnalytics: jest.fn(),
  fetchActiveUsers: jest.fn(),
  setShow: jest.fn(),
  setLineShow: jest.fn(),
  response: {
    status: 200,
    data: {
      message: 'success',
    },
  },
  formatters: {
    formatDate: jest.fn(),
  },
};
const activity = {
  action: 'som action',
};
const fields = ['CreatedAt', 'Title', 'Status'];

describe('Admin dashboard View', () => {
  it('should mount', async () => {
    const wrapper = shallowMount(Overview, {
      localVue,
      store,
      // mocks: {
      //   $route,
      // },
    });
    expect(wrapper.vm.$options.name).toMatch('DashboardHome');
    expect(wrapper.vm.fetchActiveUsers());
    expect(wrapper.vm.getRecentActivities());
    expect(wrapper.vm.getRecentActivities());
    expect(wrapper.vm.getDashBoardAnalytics());
    expect(wrapper.vm.getDashBoardAnalytics());
    expect(wrapper.vm.getDashBoardAnalytics());
    expect(wrapper.vm.setLineShow());
    expect(wrapper.vm.setShow());
    Overview.watch.overviewDuration.call(mockThis);
    Overview.watch.showChart.call(mockThis);
    Overview.watch.showLineChart.call(mockThis);
    Overview.watch.activeUserPeriod.call(mockThis);
    Overview.computed.userName.call(tryThis);
    Overview.computed.chartData.call(tryThis);
    Overview.computed.lineData.call(tryThis);
  });
});

describe('table row component', () => {
  it('mounts the component', () => {
    const wrapper = shallowMount(OverviewTable, {
      propsData: {
        activity,
        fields,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('OverviewTableRow');
    OverviewTable.filters.formatDate.call(mockThis);
  });
});
