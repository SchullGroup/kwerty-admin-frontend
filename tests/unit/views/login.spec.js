import { mount } from '@vue/test-utils';
import Login from '@/views/Auth/Login';
import { KAuth, KInput, KButton } from '@/components';
import { localVue, successStore as store } from '../../utils/local-vue';
import Vuex from 'vuex';
import KToast from '@/plugins/toast';

localVue.use(Vuex);
localVue.use(KToast)

describe('mount the Login page', () => {
  it('renders the login page', () => {
    const wrapper = mount(Login, {
      store,
      localVue,
      stubs: {
        'k-auth': KAuth,
        'k-input': KInput,
        'k-button': KButton,
        'router-link': true,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('Login');
    expect(wrapper.findComponent(KAuth).exists()).toBe(true);
    expect(wrapper.vm.loginUser())
    wrapper.setData({
      user: {
        email: 'admin@g.com',
        password: '12345',
      }
    });
    expect(wrapper.vm.loginUser())
    expect(wrapper.vm.loginUser())
  });
});
