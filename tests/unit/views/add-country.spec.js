import { shallowMount } from '@vue/test-utils';
import AddCountry from '@/views/Database/Country/AddCountry/AddCountry.vue';

jest.mock('@/api/country', () => ({
  getDashboard: jest.fn().mockResolvedValueOnce({
    data: {
      data: {
        id: 'someId',
        name: 'poland',
        resource: { 'resource 1': 'resource1.com' },
        selectedIndicator: 'id1, id2, id3',
        selectedChart: 'id1, id2, id3',
        selectedIndicators: [
          {
            name: 'indicator1',
            data: [
              { period: '2021', value: '1100' },
              { period: '2022', value: '1200' },
            ],
          },
        ],
        selectedCharts: [
          {
            name: 'chart1',
            data: [
              { period: '2021', value: '1100' },
              { period: '2022', value: '1200' },
            ],
          },
        ],
      },
    },
  }),
  addCountryDashboard: jest.fn().mockResolvedValueOnce({
    data: {
      message: 'saved successfully',
    },
  }),
  updateCountryDashboard: jest.fn().mockResolvedValue({
    data: {
      message: 'updated successfully',
    },
  }),
}));

jest.mock('@/api', () => ({
  getAllCountryData: jest.fn().mockResolvedValue({
    data: {
      data: {
        dataset: [
          { country: 'poland', nameOfIndicator: 'ind1' },
          { country: 'poland', nameOfIndicator: 'ind2' },
          { country: 'poland', nameOfIndicator: 'ind3' },
          { country: 'poland', nameOfIndicator: 'ind4' },
          { country: 'poland', nameOfIndicator: 'ind5' },
        ],
      },
    },
  }),
}));

describe('Add Country view', () => {
  let wrapper;
  const $route = {
    params: { id: 'someId' },
  };

  beforeAll(() => {
    wrapper = shallowMount(AddCountry, {
      mocks: {
        $route,
      },
    });
  });

  it('mounts', () => {
    expect(wrapper.vm.$options.name).toMatch('AddCountry');
  });

  it('saves dashboard', () => {
    const mockThis = {
      dashboard: {
        name: 'poland',
        description: 'poland country dashboard',
        selectedIndicator: '',
        selectedChart: '',
        resource: {
          resource1: 'resource1.com',
        },
      },
      indicators: [
        { id: 'id1' },
        { id: 'id2' },
        { id: 'id3' },
      ],
      charts: [
        { id: 'id1' },
        { id: 'id2' },
      ],
    };
    AddCountry.methods.saveDashboard.call(mockThis);
    mockThis.isEditView = true;
    AddCountry.methods.saveDashboard.call(mockThis);
  });

  it('uploads items', () => {
    const mockThis = {
      uploadFile: jest.fn().mockResolvedValue({ name: 'filename', url: 'fileurl' }),
      $toast: { show: jest.fn() },
      resources: [],
      dashboard: {},
    };
    AddCountry.methods.uploadCountryImage.call(mockThis, {});
    AddCountry.methods.uploadResource.call(mockThis, {});
  });

  it('adds top indicators and charts', () => {
    wrapper.vm.addIndicator('ind1');
    wrapper.vm.addTopChart('ind1');
  });

  it('removes specified items', () => {
    wrapper.vm.removeItem(0, [1, 2, 3]);
    wrapper.vm.removeResource.call({ resources: [1, 2, 3] }, 1);
  });
});
