import { shallowMount } from '@vue/test-utils';
import { localVue, successStore as store } from '../../utils/local-vue';

import KDashboardLayout from '@/components/DashboardLayout/DashboardLayout.vue';

describe('Dashboard Layout', () => {
  let wrapper = null;

  beforeAll(() => {
    wrapper = shallowMount(KDashboardLayout, {
      localVue,
      store,
      stubs: {
        'router-link': true,
      },
    });
  });
  it('should mount', () => {
    expect(wrapper.vm.$options.name).toMatch('DashboardLayout');
    expect(wrapper.attributes().class).toContain('dashboard');
  });
});
