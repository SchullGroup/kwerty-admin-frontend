import { shallowMount, createLocalVue } from '@vue/test-utils';
import ActivityHome from '../../../src/views/Activity/Activity';
import TableRow from '../../../src/views/Activity/TableRow.vue';
import { localVue, successStore as store } from '../../utils/local-vue';
import Vuex from 'vuex';
localVue.use(Vuex);

const $route = {
  params: {
    type: 'user',
  },
};
const $router = {
  push: {
    path: '/activities',
  },
};

const mockThis = {
  setType: jest.fn(),
  fetchActivities: jest.fn(),
  $route: $route,
  page: 1,
};
describe('Activity Component', () => {
  it('should mount with correct values', async () => {
    const wrapper = shallowMount(ActivityHome, {
      store,
      localVue,
      mocks: {
        $router,
        $route,
      },
    });
    await ActivityHome.mounted.call(mockThis);
    wrapper.setData({
      user: {
        token: 'admindfdfydxfgbnyfg',
      },
    });
    await ActivityHome.watch.page.call(mockThis, []);
    await ActivityHome.watch.$route.call(mockThis, []);
    expect(ActivityHome.computed.title.call(mockThis)).toMatch('Activity');
    expect(wrapper.vm.$options.name).toMatch('ActivityHome');
    expect(wrapper.vm.fetchActivities());
    expect(wrapper.vm.fetchActivities());
    expect(wrapper.vm.prevPage());
    expect(wrapper.vm.nextPage());
  });

  expect(TableRow.methods.initials('Ammiel Yawson')).toMatch('AY');
});
