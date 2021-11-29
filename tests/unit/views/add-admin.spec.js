import { shallowMount } from '@vue/test-utils';
import AddAdmin from '@/views/Settings/Manage/AddAdmin.vue';

let wrapper;
describe(' Add Admin Component', () => {
  beforeEach(async () => {
    wrapper = shallowMount(AddAdmin);
  });
  it('renders the add admin component', async () => {
    expect(wrapper.vm.$options.name).toMatch('KAddAdmin');
  });
});
