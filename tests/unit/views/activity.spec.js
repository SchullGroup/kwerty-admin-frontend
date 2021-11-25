import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import { routes } from '../../../src/router';
import ActivityHome from '../../../src/views/Activity/Activity';

describe('Activity Component', () => {
  let wrapper;
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter({ routes });
  const route = {
    params: {
      type: 'user',
    },
  };

  beforeAll(() => {
    wrapper = shallowMount(ActivityHome, {
      router,
    });
  });

  it('should mount with correct values', async () => {
    await router.push('/activities/users');
    expect(wrapper.vm.$options.name).toMatch('ActivityHome');

    const mockThis = {
      type: 'user',
      $route: route,
      activities: null,
      setType: jest.fn(),
    };
    expect(ActivityHome.computed.title.call(mockThis)).toMatch('User Activity');
    await ActivityHome.mounted.call(mockThis);
    expect(mockThis.activities.length).toBeTruthy();
  });
});
