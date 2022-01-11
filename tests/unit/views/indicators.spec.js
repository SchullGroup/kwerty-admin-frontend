import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Indicators from '@/views/Database/Indicators/Indicators.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

localVue.use(Vuex);

const mockThis = {
  page: 1,
  search: 'search',
  modelDeleteText: 'some text',
  requiredMessage: 'some text',
  fetchIndicators: jest.fn(),
  indicators: [
    {
      name: 'soem name',
      id: 'some id',
    },
  ],
};

let wrapper;
describe('Database indicators page', () => {
  beforeEach(async () => {
    wrapper = shallowMount(Indicators, {
      store,
      localVue,
    });
  });
  it('renders the indicators page', async () => {
    Indicators.watch.page.call(mockThis);
    Indicators.watch.search.call(mockThis);
    Indicators.methods.action.call(mockThis);
    expect(wrapper.vm.$options.name).toMatch('Indicators');
    expect(wrapper.vm.prevPage({ page: 1 }));
    expect(wrapper.vm.nextPage({ page: 1 }));
    expect(wrapper.vm.firstPage());
    expect(wrapper.vm.lastPage());
    expect(wrapper.vm.closeAddIndicators());
    expect(wrapper.vm.closeEditIndicators());
    wrapper.setData({
      page: 1,
    });
    expect(wrapper.vm.fetchIndicators());
    expect(wrapper.vm.fetchIndicators());
    expect(wrapper.vm.createIndicator());
    expect(wrapper.vm.createIndicator());
    expect(wrapper.vm.editIndicator());
    expect(wrapper.vm.editIndicator());
    expect(wrapper.vm.createIndicator());
    expect(wrapper.vm.removeIndicator());
    expect(wrapper.vm.removeIndicator());
    expect(Indicators.computed.isSame.call(mockThis)).toBeTruthy();
    expect(Indicators.computed.requiredMessage.call(mockThis)).toBeTruthy();
  });
});
