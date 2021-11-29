import { shallowMount } from '@vue/test-utils';
import EditAdmin from '@/views/Settings/Manage/EditAdmin.vue';

let wrapper;
describe(' Edits Admin Component', () => {
  beforeEach(async () => {
    wrapper = shallowMount(EditAdmin);
  });
  it('renders the edit admin component', async () => {
    expect(wrapper.vm.$options.name).toMatch('KEditAdmin');
  });
});
