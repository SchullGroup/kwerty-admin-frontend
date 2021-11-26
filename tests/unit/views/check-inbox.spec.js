import { mount } from '@vue/test-utils';
import CheckInbox from '@/views/Auth/CheckInbox';
import { KAuth, KButton } from '@/components';

describe('mount the check inbox page', () => {
  it('renders the check inbox page', () => {
    const wrapper = mount(CheckInbox, {
      stubs: {
        'k-auth': KAuth,
        'k-button': KButton,
        'router-link': true,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('CheckInbox');
    expect(wrapper.findComponent(KAuth).exists()).toBe(true);
  });
});
