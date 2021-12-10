import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Profile from '@/views/Settings/Profile.vue';
import ProfileMixin from '@/mixins/Profile';
import { localVue, successStore as store } from '../../utils/local-vue';

localVue.use(Vuex);
const $router = {
  push: jest.fn(),
};

describe('Settings admin profile page', () => {
  it('renders the admins profile page', async () => {
    const wrapper = shallowMount(Profile, {
      store,
      localVue,
      mixins: [ProfileMixin],
      mocks: {
        $router,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('ProfileSettings');
    expect(wrapper.attributes().class).toContain('settings__content');
    expect(wrapper.vm.logout());
    wrapper.setData({
      user: {
        token: 'admindfdfydxfgbnyfg',
      },
    });
    expect(wrapper.vm.sendNewPassword());
    expect(wrapper.vm.sendNewPassword());
  });
});
