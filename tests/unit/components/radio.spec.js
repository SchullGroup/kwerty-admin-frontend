import { shallowMount } from '@vue/test-utils';
import { KRadio } from '@/components';

let wrapper;
describe('Radio component', () => {
  beforeEach(async () => {
    wrapper = shallowMount(KRadio, {
      propsData: {
        id: 'someId',
        value: 'test-value',
        name: 'test-name',
        inputValue: 'inputvalue',
        modelValue: 'model-value',
        label: 'test-label',
      },
    });
  });
  it('renders the radio component', () => {
    expect(wrapper.vm.$options.name).toMatch('KRadio');
    expect(wrapper.attributes().class).toContain('wrapper');
    expect(wrapper.findAll('input').length).toEqual(1);
  });
});
