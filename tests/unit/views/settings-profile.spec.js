import { shallowMount } from '@vue/test-utils';
import Profile from '@/views/Settings/Profile.vue';
import { localVue, successStore as store } from '../../utils/local-vue';
import Vuex from 'vuex';

localVue.use(Vuex);
const $router = {
  push: jest.fn(),
};

describe('Settings admin profile page', () => {
  it('renders the admins profile page', async () => {
    const wrapper = shallowMount(Profile, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('ProfileSettings');
    expect(wrapper.attributes().class).toContain('settings__content');
    expect(wrapper.vm.logout());
  });
});
