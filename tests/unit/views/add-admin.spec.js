import { shallowMount } from '@vue/test-utils';
import AddAdmin from '@/views/Settings/Manage/AddAdmin.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

let wrapper;
describe(' Add Admin Component', () => {
  beforeEach(async () => {
    wrapper = shallowMount(AddAdmin, {
      localVue,
      store,
    });
  });
  it('renders the add user component', async () => {
    expect(wrapper.vm.$options.name).toMatch('KAddAdmin');
  });

  it('add new admin', () => {
    wrapper.vm.handleAddAdmin();
    wrapper.vm.handleAddAdmin();
  });

  it('should call rolesDisplay', () => {
    AddAdmin.computed.rolesDisplay.call({ roles: [] });
  });
});
