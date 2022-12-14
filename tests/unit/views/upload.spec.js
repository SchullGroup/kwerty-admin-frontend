import { shallowMount } from '@vue/test-utils';
import UploadData from '@/views/Database/Manage/Upload/Upload.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

const $router = {
  push: jest.fn(),
};
const file = new File(
  ['country,indicator\npoland,official reserve asset'],
  'poland.csv',
);
const mockE = {
  target: {
    result: 'country,indicator\npoland,official reserve asset',
  },
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
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(UploadData, {
      localVue,
      store,
      mocks: {
        $router,
      },
    });
  });

  it('should mount', async () => {
    expect(wrapper.vm.$options.name).toMatch('Upload');
    expect(wrapper.vm.goToTab());
    expect(wrapper.vm.addFile(file));
    expect(wrapper.vm.addFile(file));
    expect(wrapper.vm.loadEventListener(mockE));
  });
  it('should upload data to cloud', () => {
    expect(wrapper.vm.uploadDataToCloud());
  });
  it('should reset page', () => {
    expect(wrapper.vm.resetPage());
  });
});
