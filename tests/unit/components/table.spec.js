import { shallowMount } from '@vue/test-utils';
import { KTable } from '@/components';

describe('Table Component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(KTable);
  });

  it('should mount', () => {
    expect(wrapper.vm.$options.name).toMatch('KTable');
  });

  it('should watch selected', () => {
    const mockThis = {
      $emit: jest.fn(),
    };
    KTable.watch.selected.call(mockThis);
    expect(mockThis.$emit).toHaveBeenCalledWith('change', undefined);
  });
});
