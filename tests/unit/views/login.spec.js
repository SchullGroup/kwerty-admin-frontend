import { mount } from '@vue/test-utils';
import Login from '@/views/Auth/Login';
import { KAuth, KInput, KButton } from '@/components';

describe('mount the Login page', () => {
  it('renders the login page', () => {
    const wrapper = mount(Login, {
      stubs: {
        'k-auth': KAuth,
        'k-input': KInput,
        'k-button': KButton,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('Login');
    expect(wrapper.findComponent(KAuth).exists()).toBe(true);
  });
});
