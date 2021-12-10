import { shallowMount } from '@vue/test-utils';
import Admins from '@/views/Settings/Manage/Admins.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

let wrapper;
describe('Admins Component', () => {
  beforeAll(async () => {
    wrapper = shallowMount(Admins, {
      localVue,
      store,
    });
  });
  it('renders the admins component', async () => {
    expect(wrapper.vm.$options.name).toMatch('KAdmins');
    expect(wrapper.attributes().class).toContain('admins');
    expect(wrapper.vm.toggleButtonText());
    expect(wrapper.vm.handleEditAdmin(1));
  });

  it('deletes other admin', () => {
    wrapper.vm.handleDeleteAdmin(1);
    wrapper.vm.handleDeleteAdmin(1);
  });

  it('select admin to be edited', () => {
    const mockThis = {
      $toast: { show: jest.fn() },
      showEditModal: false,
      currentAdmin: null,
      roles: [{ id: 1, name: 'super_admin' }],
      admins: {
        find: jest.fn().mockReturnValueOnce({
          id: 1, firstName: 'Steve', lastName: 'Rogers', roleName: 'super_admin',
        }).mockReturnValueOnce(new Error('error occurred')),
      },
    };
    Admins.methods.handleEditAdmin.call(mockThis, 1);
    Admins.methods.handleEditAdmin.call(mockThis, 1);
  });
});
