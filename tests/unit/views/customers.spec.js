import { shallowMount } from '@vue/test-utils';
import Customers from '@/views/Customers/Customers.vue';
import Customer from '@/views/Customers/Customer.vue';

describe('Customer Component', () => {
  it('should mount the customers page', async () => {
    const wrapper = shallowMount(Customers);
    expect(wrapper.vm.$options.name).toMatch('Customers');
    expect(wrapper.vm.prevPage());
    expect(wrapper.vm.nextPage());
    expect(wrapper.vm.firstPage());
    expect(wrapper.vm.lastPage());
    expect(wrapper.vm.downloadUsers());
  });
  it('should mount the single customer page', async () => {
    const wrapper = shallowMount(Customer);
    expect(wrapper.vm.$options.name).toMatch('singleuser');
    expect(wrapper.vm.prevPage());
    expect(wrapper.vm.nextPage());
    expect(wrapper.vm.firstPage());
    expect(wrapper.vm.lastPage());
  });
});
