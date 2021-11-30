import { shallowMount } from '@vue/test-utils';
import Admins from '@/views/Settings/Manage/Admins.vue';

let wrapper;
describe('Admins Component', () => {
  beforeEach(async () => {
    wrapper = shallowMount(Admins);
  });
  it('renders the admins component', async () => {
    expect(wrapper.vm.$options.name).toMatch('KAdmins');
    expect(wrapper.attributes().class).toContain('admins');
    expect(wrapper.vm.toggleButtonText());
    expect(wrapper.vm.handleEditAdmin({showEditModal: true, currentAdmin: {}}));
  });
});
