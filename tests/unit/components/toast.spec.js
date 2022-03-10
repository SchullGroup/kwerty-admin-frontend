import { mount } from '@vue/test-utils';
import { KToast } from '@/components';
import { localVue } from '../../utils/local-vue';

const mockNotifications = [
  {
    message: 'This is a toast notification',
    id: 1,
  },
  {
    message: 'This is another toast notification',
    id: 2,
  },
];
let wrapper;
describe('Toast Component', () => {
  beforeEach(async () => {
    wrapper = mount(KToast, {
      localVue,
    });

    jest.useFakeTimers(); // Does work when its placed here
  });
  it('Renders the toast components', () => {
    expect(wrapper.vm.$options.name).toMatch('ToastNotification');
    expect(wrapper.attributes().id).toBe('toast-group');
  });
  it('Initializes with the right data', () => {
    expect(wrapper.vm.notifications).toEqual([]);
    expect(wrapper.vm.endList).toBe(false);
  });
  it('it renders when data is passed', async () => {
    await wrapper.setData({
      notifications: mockNotifications,
    });
    expect(wrapper.vm.notifications.length).toEqual(2);
    expect(wrapper.findAll('.toast').exists()).toBe(true);
  });
  it('a new notification is added to the list', async () => {
    jest.spyOn(wrapper.vm, 'addNotification');
    jest.spyOn(wrapper.vm, 'removeToast');
    await wrapper.setData({
      notifications: mockNotifications,
    });
    await wrapper.vm.$toast.show({
      message: 'This is a toast notification',
      type: 'error',
      fade: 3000,
      id: 4,
    });
    expect(wrapper.vm.addNotification).toHaveBeenCalled();
    jest.runAllTimers();
    expect(wrapper.vm.removeToast).toHaveBeenCalled();
    await wrapper.vm.$toast.show({
      message: 'This is a toast notification',
      type: 'error',
      id: 5,
    });
    expect(wrapper.vm.addNotification).toHaveBeenCalledTimes(2);
  });
});
