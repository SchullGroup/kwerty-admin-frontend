import { shallowMount } from '@vue/test-utils';
import ManageCountry from '../../../src/views/Database/Country/ManageCountry/ManageCountry.vue';

jest.mock('@/api/country', () => {
  const dashboardList = [
    {
      name: 'poland',
      imageUrl: 'polandImage',
      id: 'polandId',
    },
    {
      name: 'ghana',
      imageUrl: 'ghanaImage',
      id: 'ghanaId',
    },
  ];

  const listResponse = jest.fn().mockResolvedValue({
    data: {
      data: {
        total: 3,
        totalPages: 1,
        dashboard: dashboardList,
      },
    },
  });
  return {
    searchDashboards: listResponse,
    getAllDashboards: listResponse,
    deleteDashboard: jest.fn(),
  };
});

describe('Manage Country view', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(ManageCountry);
  });

  it('mounts', () => {
    expect(wrapper.vm.$options.name).toMatch('ManageCountry');
  });

  it('fetches new list on search', () => {
    wrapper.setData({ search: 'poland' });
    wrapper.vm.$nextTick(() => {
      wrapper.setData({ search: '' });
    });
  });

  it('deletes dashboard', () => {
    wrapper.vm.deleteCountry({ id: 'id1' });
  });

  it('fetches new list on page change', () => {
    wrapper.setData({ page: 3 });
  });
});
