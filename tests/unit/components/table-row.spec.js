import { shallowMount } from '@vue/test-utils';
import TableRow from '@/components/Table/TableRow.vue';

describe('TableRow Component', () => {
  it('should mount', () => {
    const wrapper = shallowMount(TableRow);
    expect(wrapper.vm.$options.name).toMatch('TableRow');
  });
  it('should emit input on value change', () => {
    const mockThis = {
      data: {
        indicator: 'hello',
      },
      innerValue: ['hello'],
      value: ['world'],
      $emit: jest.fn(),
    };
    // if indicator is not in value, add and emit
    TableRow.watch.innerValue.call(mockThis);
    expect(mockThis.$emit).toHaveBeenCalledWith('input', ['world', 'hello']);
    // else if indicator is in value, remove and emit
    mockThis.value = ['hello', 'world'];
    mockThis.$emit = jest.fn();
    TableRow.watch.innerValue.call(mockThis);
    expect(mockThis.$emit).toHaveBeenCalledWith('input', ['world']);
  });
});
