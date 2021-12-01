import { shallowMount } from '@vue/test-utils';
import ManageData from '@/views/Database/Manage/Manage.vue';

describe('ManageData View', () => {
  it('should mount', () => {
    const wrapper = shallowMount(ManageData);
    expect(wrapper.vm.$options.name).toMatch('ManageData');
  });
});
