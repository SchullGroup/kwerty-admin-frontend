import { shallowMount } from '@vue/test-utils';
import { KToggle } from '@/components';

describe('Toggle component', () => {
  it('renders the toggle component', () => {
    const wrapper = shallowMount(KToggle, {
      propsData: {
        disabled: 'false',
      },
    });
    expect(wrapper.vm.$options.name).toMatch('KToggle');
    expect(wrapper.attributes().class).toContain('wrapper');
    expect(wrapper.findAll('button').length).toEqual(2);
    expect(wrapper.vm.toggle())
  });
});
