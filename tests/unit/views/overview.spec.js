import { shallowMount } from '@vue/test-utils';
import Overview from '@/views/Overview/Overview.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

// const $route = {
//   query: {
//     active: 'published',
//   },
// };

describe('Admin dashboard View', () => {
  it('should mount', async () => {
    const wrapper = shallowMount(Overview, {
      localVue,
      store,
      // mocks: {
      //   $route,
      // },
    });
    expect(wrapper.vm.$options.name).toMatch('DashboardHome');
    expect(wrapper.vm.getRecentActivities());
    expect(wrapper.vm.getDashBoardAnalytics());
  });
});
