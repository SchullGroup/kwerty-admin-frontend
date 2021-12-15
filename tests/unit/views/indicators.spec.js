import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Indicators from '@/views/Database/Indicators/Indicators.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

localVue.use(Vuex);

// const mockThis = {
//   page: 1,
// };

let wrapper;
describe('Database indicators page', () => {
  beforeEach(async () => {
    wrapper = shallowMount(Indicators, {
      store,
      localVue,
    });
  });
  it('renders the indicators page', () => {
    expect(wrapper.vm.$options.name).toMatch('Indicators');
    expect(wrapper.vm.prevPage({ page: 1 }));
    expect(wrapper.vm.nextPage({ page: 1 }));
    expect(wrapper.vm.firstPage());
    expect(wrapper.vm.lastPage());
    wrapper.setData({
      page: 1,
    });
    expect(wrapper.vm.createIndicator());
    expect(wrapper.vm.createIndicator());
    expect(wrapper.vm.fetchIndicator());
    expect(wrapper.vm.fetchIndicator());
  });
});
