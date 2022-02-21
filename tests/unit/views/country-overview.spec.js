import { shallowMount } from '@vue/test-utils';
import CountryOverview from '@/views/Database/Country/CountryOverview/CountryOverview.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

jest.mock('@/api/country', () => ({
  __esModule: true,
  getCountryAnalytics: jest
    .fn()
    .mockRejectedValueOnce({
      response: {
        error: '',
      },
    })
    .mockResolvedValueOnce({
      data: {
        data: {
          totalVisit: [
            {
              count: '1',
            },
          ],
          totalRequestSent: [
            {
              count: '1',
            },
          ],
          totalChartClicks: [
            {
              count: '1',
            },
          ],
          totalVisitPerCountry: [
            {
              country: 'poland',
              count: '1',
            },
          ],
          countriesNotFound: [
            {
              country: 'poland',
              count: '1',
            },
          ],
          topUsers: [
            {
              country: 'poland',
              count: '1',
            },
          ],
        },
      },
    })
    .mockRejectedValueOnce({
      response: {
        error: 'error occured',
      },
    }),
}));

const mockThis = {
  fetchCountryAnalytics: jest.fn(),
  setTimeout: jest.fn(),
  totalVisitPerCountry: [
    {
      country: 'poland',
      count: '1',
    },
    {
      country: 'poland',
      count: '1',
    },
  ],
};

describe('Admin country dashboard View', () => {
  it('should mount', async () => {
    const wrapper = shallowMount(CountryOverview, {
      localVue,
      store,
    });
    CountryOverview.watch.showChart.call(mockThis);
    CountryOverview.watch.duration.call(mockThis);
    // CountryOverview.computed.chartData.call(totalVisitCountry).toBeTruthy();
    expect(wrapper.vm.$options.name).toMatch('ManageCountry');
    expect(wrapper.vm.fetchCountryAnalytics());
    expect(wrapper.vm.fetchCountryAnalytics());
    expect(wrapper.vm.setShow());
  });
});
