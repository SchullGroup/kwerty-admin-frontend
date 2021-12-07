import { shallowMount } from '@vue/test-utils';
import UploadData from '@/views/Database/Manage/Upload/Upload.vue';
// import { KDashboardLayout, KButton, KInput, KModal } from '@/components';

const $router = {
  push: jest.fn(),
};
const mockE = {
  target: {
    files: [
      { name: 'Hello' },
    ],
  },
};

describe('manage upload file View', () => {
  it('should mount', async () => {
    const wrapper = shallowMount(UploadData, {
      // stubs: {
      //   'k-dashboard-layout': KDashboardLayout,
      //   'k-button': KButton,
      //   'k-input': KInput,
      //   'k-modal': KModal,
      // },
      mocks: {
        $router,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('Upload');
    expect(wrapper.vm.goToTab());
    expect(wrapper.vm.addFile(mockE));
  });
});
