import { shallowMount } from '@vue/test-utils';
import UploadData from '@/views/Database/Manage/Upload/Upload.vue';


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
      mocks: {
        $router,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('Upload');
    expect(wrapper.vm.goToTab())
    expect(wrapper.vm.addFile(file));
  });
});