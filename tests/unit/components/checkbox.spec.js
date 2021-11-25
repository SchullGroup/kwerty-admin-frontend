import { shallowMount } from '@vue/test-utils';
import { KCheckbox } from '@/components';

let wrapper;
describe('Checkbox Component', () => {
  beforeEach(async () => {
    wrapper = shallowMount(KCheckbox, {
      propsData: {
        fill: 'fill',
        name: 'some name',
        label: 'label',
        value: ['value'],
        checkedValue: ['firstVal', 'secondVal', 'testVal'],
      },
    });
  });
  it('renders the checkbox component', async () => {
    await wrapper.setData({
      innerValue: 'value',
    });
    expect(wrapper.vm.$options.name).toMatch('KCheckbox');
    expect(wrapper.attributes().class).toContain('wrapper');
    expect(wrapper.findAll('input').length).toEqual(1);
    expect(wrapper.findAll('label').length).toEqual(1);
  });
});
