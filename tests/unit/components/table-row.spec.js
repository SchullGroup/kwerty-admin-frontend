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
        id: 'hello',
      },
      innerValue: ['hello'],
      value: ['world'],
      $emit: jest.fn(),
      checkAndAdd: jest.fn(),
      formatters: jest.fn(),
    };

    TableRow.watch.innerValue.call(mockThis);
    expect(mockThis.checkAndAdd).toHaveBeenCalledWith(['world']);

    mockThis.value = ['hello', 'world'];
    mockThis.$emit = jest.fn();
    mockThis.innerValue = [];
    TableRow.methods.checkAndAdd.call(mockThis, mockThis.value);
    expect(mockThis.$emit).toHaveBeenCalledWith('input', ['world']);

    TableRow.watch.value.call(mockThis, []);
    expect(mockThis.innerValue.length).toBe(0);

    mockThis.value = ['world'];
    mockThis.innerValue = ['hello'];
    TableRow.methods.checkAndAdd.call(mockThis, ['world']);
    expect(mockThis.$emit).toHaveBeenCalledWith('input', ['world', 'hello']);
    TableRow.filters.formatField.call(mockThis);
    TableRow.filters.formatField.call(mockThis, new Date(), 'createdAt');
  });
});
