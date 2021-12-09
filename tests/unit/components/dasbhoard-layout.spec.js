import { shallowMount, createLocalVue } from '@vue/test-utils';
import { localVue, successStore as store } from '../../utils/local-vue';
import Vuex from 'vuex';

import KDashboardLayout from '@/components/DashboardLayout/DashboardLayout.vue';


localVue.use(Vuex);

describe('Dashboard Layout', () => {
  it('should mount', () => {
    const wrapper = shallowMount(KDashboardLayout, {
      localVue,
      store,
      stubs: {
        'router-link': true,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('DashboardLayout');
    expect(wrapper.attributes().class).toContain('dashboard');
    // expect(KDashboardLayout.filters.call())
  });
});
