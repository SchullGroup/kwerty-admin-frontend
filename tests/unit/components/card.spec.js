import { shallowMount } from '@vue/test-utils';
import KCard from '@/components/Card/Card.vue';

describe('Card Component', () => {
  let wrapper = null;

  beforeAll(() => {
    wrapper = shallowMount(KCard, {
      propsData: {
        heading: 'Role',
        variant: 'in-modal',
      },
    });
  });

  it('should mount', () => {
    expect(wrapper.vm.$options.name).toMatch('KCard');
    expect(wrapper.attributes().class).toContain('card');
  });
  it('should render provided heading', () => {
    expect(wrapper.text()).toContain('Role');
  });
  it('should convert variants to BEM classnames', () => {
    expect(wrapper.attributes().class).toContain('card--in-modal');
  });
});
