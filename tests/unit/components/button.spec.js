import { shallowMount } from '@vue/test-utils';
import { KButton } from '@/components';

describe('Button Component', () => {
  it('renders a button', () => {
    const wrapper = shallowMount(KButton);
    expect(wrapper.vm.$options.name).toMatch('KButton');
    expect(wrapper.findAll('button').length).toEqual(1);
    expect(wrapper.attributes().class).toContain('btn');
  });
  it('renders the correct type of button', () => {
    const wrapper = shallowMount(KButton, {
      propsData: {
        variant: 'secondary',
      },
    });
    expect(wrapper.classes()).toContain('btn--secondary');
    expect(wrapper.classes('btn--full')).toBe(false);
  });
  it('renders the correct width of button', () => {
    const wrapper = shallowMount(KButton, {
      propsData: {
        size: 'full',
      },
    });
    expect(wrapper.classes()).toContain('btn--full');
  });
  it('renders the slots', () => {
    const wrapper = shallowMount(KButton, {
      slots: {
        default: 'Button content',
      },
    });
    expect(wrapper.text()).toContain('Button content');
  });
  it('handles the click event', async () => {
    const handleClick = jest.fn();
    const wrapper = shallowMount(KButton, {
      listeners: {
        click: handleClick,
      },
    });
    await wrapper.trigger('click');
    expect(handleClick).toBeCalled();
  });
});
