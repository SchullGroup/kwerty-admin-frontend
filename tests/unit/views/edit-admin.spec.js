import { shallowMount } from '@vue/test-utils';
import EditAdmin from '@/views/Settings/Manage/EditAdmin.vue';

let wrapper;
describe(' Edits Admin Component', () => {
  beforeEach(async () => {
    wrapper = shallowMount(EditAdmin);
  });
  it('renders the edit admin component', async () => {
    const mockThis = {
      currentadmin: {
        firstName: 'Sam',
        lastName: 'lokonga',
        email: 'SL@gmail.com',
      },
    };
    expect(wrapper.vm.$options.name).toMatch('KEditAdmin');
    expect(EditAdmin.created.call(mockThis));
  });
});
