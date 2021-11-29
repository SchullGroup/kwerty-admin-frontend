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

    const mockThis = {
      value: 'Ghana',
      checkedValue: ['Ghana', 'Nigeria', 'Togo'],
      innerValue: null,

    };
    await KCheckbox.watch.innerValue.call(mockThis, null);
    await KCheckbox.watch.value.call(mockThis, 'spade');
    expect(mockThis.checkedValue.length).toEqual(2);
    expect(mockThis.innerValue).toMatch('spade');
  });
});
