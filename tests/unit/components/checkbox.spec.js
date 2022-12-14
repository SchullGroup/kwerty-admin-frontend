import { shallowMount } from '@vue/test-utils';
import { KCheckbox } from '@/components';
import Checkbox from '../../../src/components/Checkbox/Checkbox';

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
      checkValue: jest.fn(),

    };
    await KCheckbox.watch.innerValue.call(mockThis, null);
    expect(mockThis.checkedValue.length).toEqual(3);

    await KCheckbox.methods.checkValue.call(mockThis, ['Ghana', 'Nigeria', 'Togo']);
    expect(mockThis.checkedValue.length).toEqual(2);

    await KCheckbox.methods.checkValue.call(mockThis, ['Ghana', 'Nigeria', 'Togo'], true);
    expect(mockThis.innerValue).toBeTruthy();

    await KCheckbox.methods.checkValue.call(mockThis, ['Nigeria', 'Togo'], true);
    expect(mockThis.innerValue).toBeFalsy();

    mockThis.innerValue = true;
    KCheckbox.watch.checkedValue.call(mockThis, []);
    expect(mockThis.innerValue).toBeFalsy();
  });

  it('has checked value prop with [] as default', () => {
    expect(Checkbox.props.checkedValue.default()).toEqual([]);
  });
});
