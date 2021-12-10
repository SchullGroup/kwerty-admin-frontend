import { shallowMount } from '@vue/test-utils';
import UploadData from '@/views/Database/Manage/Upload/Upload.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

const $router = {
  push: jest.fn(),
};
const file = {
  name: 'Hello',
  arrayBuffer: jest
    .fn()
    .mockResolvedValueOnce([{ id: 1 }])
    .mockRejectedValueOnce('Error occurred'),
};

jest.mock('xlsx', () => ({
  __esModules: true,
  read: jest.fn().mockReturnValue({ Sheets: [{}] }),
  utils: {
    sheet_to_json: jest.fn().mockReturnValue([
      { name: 'Jack', bal: '0.50' },
      {
        name: 'Jane',
        bal: '200',
      },
    ]),
  },
}));

describe('manage upload file View', () => {
  it('should mount', async () => {
    const wrapper = shallowMount(UploadData, {
      localVue,
      store,
      mocks: {
        $router,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('Upload');
    expect(wrapper.vm.goToTab());
    expect(wrapper.vm.addFile(file));
    expect(wrapper.vm.addFile(file));
  });
});
