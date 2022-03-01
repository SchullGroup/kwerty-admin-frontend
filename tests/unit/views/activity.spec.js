import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import ActivityHome from '@/views/Activity/Activity';
import TableRow from '@/views/Activity/TableRow.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

localVue.use(Vuex);

const $route = {
  params: {
    type: 'user',
  },
  query: {
    userName: 'name',
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
  formatISO: jest.fn(),
  saveAs: jest.fn(),
  $route,
  page: 1,
};

const mockDownload = {
  formatISO: jest.fn(),
  saveAs: jest.fn(),
  type: 'admin',
  startdate: '',
  enddate: '',
  fileType: 'pdf',
  title: 'Title of pdf',
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
    await ActivityHome.watch.search.call(mockThis, []);
    await ActivityHome.watch.duration.call(mockThis, []);
    await ActivityHome.watch.$route.call(mockThis, []);
    expect(ActivityHome.computed.pageTitle.call(mockThis)).toMatch('Activity');
    expect(ActivityHome.computed.activities.call(mockThis));
    expect(wrapper.vm.$options.name).toMatch('ActivityHome');
    wrapper.setData({
      type: 'admin',
    });
    expect(wrapper.vm.fetchActivities());
    expect(wrapper.vm.fetchActivities());
    expect(wrapper.vm.setType());
    expect(wrapper.vm.prevPage());
    expect(wrapper.vm.nextPage());
    expect(wrapper.vm.firstPage());
    expect(wrapper.vm.lastPage());
  });
  it('should run download methods', async () => {
    const wrapper = shallowMount(ActivityHome, {
      store,
      localVue,
      mocks: {
        $router,
        $route,
      },
    });
    ActivityHome.methods.downloadActivities.call(mockDownload);
    ActivityHome.methods.downloadActivities.call(mockDownload);
    ActivityHome.methods.downloadActivities.call(mockDownload);
    expect(wrapper.vm.reset());
  });
  it('should fromat the date', () => {
    expect(TableRow.methods.initials('Ammiel Yawson')).toMatch('AY');
    expect(TableRow.filters.formatDate(new Date(), 'createdAt'));
    expect(TableRow.filters.formatDate(new Date(), 'somethingelse'));
    expect(TableRow.filters.formatDate('', 'createdAt'));
  });
});
