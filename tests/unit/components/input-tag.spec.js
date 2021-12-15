import { shallowMount } from '@vue/test-utils';
import InputTag from '@/components/Input/InputTags.vue';

const e = {
  code: 'Enter',
};
describe('input tag component', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(InputTag);
    expect(wrapper.vm.$options.name).toMatch('Inputtag');
    expect(wrapper.vm.handleSubmit());
    expect(wrapper.vm.handleKey(e));
    expect(wrapper.vm.removeTag());
  });
});
