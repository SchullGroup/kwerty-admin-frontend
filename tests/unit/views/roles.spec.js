import { mount } from '@vue/test-utils';
import { localVue, successStore as store } from '../../utils/local-vue';
import Roles from '@/views/Settings/Roles/Roles.vue';

describe('Roles View', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(Roles, {
      localVue,
      store,
    });
  });
  it('should mount', () => {
    expect(wrapper.vm.$options.name).toMatch('RolesAndPermissions');
    const mockThis = {
      $toast: { show: jest.fn() },
      deleteRole: jest.fn().mockReturnValue({ error: 'error occurred' }),
    };
    wrapper.vm.addItem();
    wrapper.vm.editItem();
    wrapper.vm.deleteItem({ id: 1 });
    wrapper.vm.deleteItem({ id: 1 });
    Roles.methods.deleteItem.call(mockThis);
  });
});
