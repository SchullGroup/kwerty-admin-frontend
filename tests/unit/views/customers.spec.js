import { shallowMount } from '@vue/test-utils';
import Customers from '@/views/Customers/Customers.vue';
import Customer from '@/views/Customers/Customer.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

const $route = {
  query: {
    name: 'some name',
  },
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
    expect(wrapper.vm.downloadUsers());
    expect(wrapper.vm.fetchAllCustomers());
    expect(wrapper.vm.fetchAllCustomers());
    expect(wrapper.vm.changeUserStatus());
    expect(wrapper.vm.changeUserStatus());
  });
  it('should mount the single customer page', async () => {
    const wrapper = shallowMount(Customer, {
      mocks: {
        $route,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('singleuser');
    expect(wrapper.vm.prevPage());
    expect(wrapper.vm.nextPage());
    expect(wrapper.vm.firstPage());
    expect(wrapper.vm.lastPage());
  });
});
