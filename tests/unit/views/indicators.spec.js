import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Indicators from '@/views/Database/Indicators/Indicators.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

localVue.use(Vuex);

const mockThis = {
  page: 1,
  search: 'search',
  selected: ['q2345r6tfv3254er6tyu', '1234tr56tfsd5ty87rd'],
  modelDeleteText: 'some text',
  requiredMessage: 'some text',
  fetchIndicators: jest.fn(),
  indicators: [
    {
      id: 'zx4656787tb43er8',
      name: 'soem name',
      tags: 'money, finance',
    },
    {
      id: '2345tfxcvbjko765edc',
      name: 'soem name',
      tags: 'money, finance',
    },
  ],
  editIndicatorModal: false,
  showModal: false,
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
    Indicators.watch.search.call(mockThis);
    Indicators.watch.frequency.call(mockThis);
    Indicators.watch.category.call(mockThis);
    wrapper.setData({
      val: 'val',
    });
    Indicators.watch.page.call(mockThis);
    wrapper.setData({
      indicator: {
        tags: 'money, finance, health',
      },
    });
    expect(Indicators.computed.isSame.call(mockThis));
    expect(Indicators.computed.requiredMessage.call(mockThis));
    Indicators.methods.action.call(mockThis);
    expect(wrapper.vm.$options.name).toMatch('Indicators');
  });
  it('expected to run methods', async () => {
    expect(wrapper.vm.createIndicator());
    expect(wrapper.vm.createIndicator());
    expect(wrapper.vm.createIndicator());
    expect(wrapper.vm.editIndicator());
    expect(wrapper.vm.editIndicator());
    expect(wrapper.vm.fetchIndicators());
    expect(wrapper.vm.fetchIndicators());
    expect(wrapper.vm.removeIndicator());
    expect(wrapper.vm.removeIndicator());
  });
  it('expected to run other methods', async () => {
    expect(wrapper.vm.resetForm());
    expect(wrapper.vm.closeAddIndicators(mockThis));
    expect(wrapper.vm.closeEditIndicators(mockThis));
    expect(wrapper.vm.prevPage({ page: 1 }));
    expect(wrapper.vm.nextPage({ page: 1 }));
    expect(wrapper.vm.firstPage());
    expect(wrapper.vm.lastPage());
  });
});
