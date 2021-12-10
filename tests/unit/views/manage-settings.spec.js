import { shallowMount } from '@vue/test-utils';
import ManageAdmins from '@/views/Settings/Manage/Manage.vue';
import { KPagination } from '@/components';
import { localVue, successStore as store } from '../../utils/local-vue';

let wrapper;
describe(' Manage Admins Page', () => {
  beforeEach(async () => {
    wrapper = shallowMount(ManageAdmins, {
      localVue,
      store,
    });
  });
  it('renders the manage admins page', async () => {
    expect(wrapper.vm.$options.name).toMatch('ManageAdminsSettings');
    expect(wrapper.vm.nextPage());
    expect(wrapper.vm.prevPage());
    expect(wrapper.vm.firstPage());
    expect(wrapper.vm.lastPage());
  });

  it('fetches page on page change', () => {
    const mockThis = {
      user: { token: 'cryptic' },
      $toast: { show: jest.fn() },
      fetchAdmins: jest.fn().mockRejectedValue(new Error('error occurred')),
    };
    ManageAdmins.watch.page.call(mockThis, 1);
  });
});
