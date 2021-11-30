import { shallowMount } from '@vue/test-utils';
import Roles from '@/views/Settings/Roles/Roles';

describe('Roles View', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(Roles);
  });
  it('should mount', () => {
    expect(wrapper.vm.$options.name).toMatch('RolesAndPermissions');
    wrapper.vm.addItem();
    wrapper.vm.editItem();
    wrapper.vm.deleteItem({ title: 'hello world' });
  });
});
