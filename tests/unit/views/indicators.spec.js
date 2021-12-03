import { shallowMount } from '@vue/test-utils';
import Indicators from '@/views/Database/Indicators/Indicators.vue';

let wrapper;
describe('Database indicators page', () => {
  beforeEach(async () => {
    wrapper = shallowMount(Indicators);
  });
  it('renders the indicators page', () => {
    expect(wrapper.vm.$options.name).toMatch('Indicators');
    expect(wrapper.vm.prevPage());
    expect(wrapper.vm.nextPage());
  });
});
