import { shallowMount } from '@vue/test-utils';
import ManageAdmins from '@/views/Settings/Manage/Manage.vue';
import { KPagination} from '@/components';


let wrapper;
describe(' Manage Admins Page', () => {
  beforeEach(async () => {
    wrapper = shallowMount(ManageAdmins, {
      stubs: {
        'k-pagination': KPagination,
      },
    });
  });
  it('renders the manage admins page', async () => {
    expect(wrapper.vm.$options.name).toMatch('ManageAdminsSettings');
  });
});
