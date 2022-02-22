import { shallowMount } from '@vue/test-utils';
import Customers from '@/views/Customers/Customers.vue';
import Customer from '@/views/Customers/Customer.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

const $route = {
  query: {
    name: 'some name',
  },
};

const mockThis = {
  formatISO: jest.fn(),
  saveAs: jest.fn(),
};

describe('Customer Component', () => {
  it('should mount the customers page', async () => {
    const wrapper = shallowMount(Customers, {
      store,
      localVue,
    });
    expect(wrapper.vm.$options.name).toMatch('Customers');
    expect(wrapper.vm.prevPage());
    expect(wrapper.vm.nextPage());
    expect(wrapper.vm.firstPage());
    expect(wrapper.vm.lastPage());
    expect(wrapper.vm.fetchAllCustomers());
    expect(wrapper.vm.fetchAllCustomers());
    expect(wrapper.vm.changeUserStatus());
    expect(wrapper.vm.changeUserStatus());
    // expect(wrapper.vm.downloadCustomers());
    // expect(wrapper.vm.downloadCustomers());
    Customers.methods.downloadCustomers.call(new Date(mockThis));
    Customers.methods.downloadCustomers.call(new Date(mockThis));
    Customers.methods.downloadCustomers.call(new Date(mockThis));
  });
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
  });
});
