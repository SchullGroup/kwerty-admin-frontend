import { mount } from '@vue/test-utils';
import ResetPassword from '@/views/Auth/ResetPassword';
import { KAuth, KInput, KButton } from '@/components';
import { localVue, successStore as store } from '../../utils/local-vue';
import KToast from '@/plugins/toast';
import Vuex from 'vuex';

localVue.use(Vuex);
localVue.use(KToast)

describe('mount the reset password page', () => {
  it('renders the reset password page', () => {
    const wrapper = mount(ResetPassword, {
      store,
      localVue,
      stubs: {
        'k-auth': KAuth,
        'k-input': KInput,
        'k-button': KButton,
        'router-link': true,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('ResetPassword');
    expect(wrapper.findComponent(KAuth).exists()).toBe(true);
    wrapper.setData({
      user: {
        email: 'admin@g.com',
      },
    });
    expect(wrapper.vm.forgotPassword());
  });
});
