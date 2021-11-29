import { shallowMount } from '@vue/test-utils';
import { localVue, successStore as store } from '../../utils/local-vue';

import KSettings from '@/views/Settings/Settings.vue';
import { KDashboardLayout } from '@/components';

describe('Setttings page', () => {
  let wrapper = null;

  beforeAll(() => {
    wrapper = shallowMount(KSettings, {
      localVue,
      store,
      stubs: {
        KDashboardLayout,
        'router-link': true,
      },
    });
  });
  it('should mount', () => {
    expect(wrapper.vm.$options.name).toMatch('Settings');
    expect(wrapper.attributes().class).toContain('dashboard');
  });
});
