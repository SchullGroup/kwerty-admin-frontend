import { shallowMount } from '@vue/test-utils';
import Customers from '@/views/Customers/Customers.vue';
import Customer from '@/views/Customers/Customer.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

const $route = {
  query: {
    name: 'some name',
    id: '234e5r6tyufv678',
  },
};
const mockThis = {
  fetchAllCustomers: jest.fn(),
  page: 1,
  getSingleUserActivities: jest.fn(),
  $route: {
    query: {
      name: 'some name',
      id: '234e5r6tyufv678',
    },
  },
  debounce: jest.fn(() => () => {}),
};

jest.mock('@/api/upload', () => ({
  __esModules: true,
  downloadDataset: jest.fn(),
}));

describe('Customers Component', () => {
  it('should mount the customers page', async () => {
    const wrapper = shallowMount(Customers, {
      store,
      localVue,
    });
    Customers.watch.search.call(mockThis);
    expect(wrapper.vm.$options.name).toMatch('Customers');
    expect(wrapper.vm.prevPage());
    expect(wrapper.vm.nextPage());
    expect(wrapper.vm.firstPage());
    expect(wrapper.vm.lastPage());
    expect(wrapper.vm.fetchAllCustomers());
    expect(wrapper.vm.fetchAllCustomers());
    expect(wrapper.vm.changeUserStatus());
    expect(wrapper.vm.changeUserStatus());
    expect(wrapper.vm.changeUserStatus());
  });
});

const mockDownload = {
  formatISO: jest.fn(),
  startDate: 'Tue Feb 22 2022 15:30:22 GMT+0000 (Greenwich Mean Time)',
  endDate: 'Tue Feb 28 2022 15:30:22 GMT+0000 (Greenwich Mean Time)',
  fileType: 'pdf',
  title: 'Title of pdf',
  saveAs: jest.fn(),
  exportCustomers: jest
    .fn()
    .mockResolvedValueOnce(
      // eslint-disable-next-line quotes
      "id", "email", "joined", "status", "actions", "fullName", "userLastSeen", "imageUrl",
    ),
  $route: {
    query: {
      name: 'some name',
      id: '234e5r6tyufv678',
    },
  },
};
describe('Customer Component', () => {
  it('should mount the single customer page', async () => {
    const wrapper = shallowMount(Customer, {
      store,
      localVue,
      mocks: {
        $route,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('singleuser');
    expect(wrapper.vm.prevPage());
    expect(wrapper.vm.nextPage());
    expect(wrapper.vm.firstPage());
    expect(wrapper.vm.lastPage());
    expect(wrapper.vm.getSingleUserActivities());
    expect(wrapper.vm.getSingleUserActivities());
    expect(wrapper.vm.downloadCsv());
    expect(wrapper.vm.reset());
    Customer.watch.duration.call(mockThis);
  });
  it('should run methods', async () => {
    const wrapper = shallowMount(Customer, {
      store,
      localVue,
      mocks: {
        $route,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('singleuser');
    Customer.methods.downloadCsv.call(mockDownload);
    Customer.methods.downloadCsv.call(mockDownload);
  });
});
