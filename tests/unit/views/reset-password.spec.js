import { mount } from '@vue/test-utils';
import ResetPassword from '@/views/Auth/ResetPassword';
import { KAuth, KInput, KButton } from '@/components';

describe('mount the reset password page', () => {
  it('renders the reset password page', () => {
    const wrapper = mount(ResetPassword, {
      stubs: {
        'k-auth': KAuth,
        'k-input': KInput,
        'k-button': KButton,
        'router-link': true,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('ResetPassword');
    expect(wrapper.findComponent(KAuth).exists()).toBe(true);
  });
});
