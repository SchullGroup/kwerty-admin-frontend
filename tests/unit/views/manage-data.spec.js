import { shallowMount } from '@vue/test-utils';
import ManageData from '@/views/Database/Manage/Manage.vue';

const $route = {
  query: {
    active: 'my-test-tab',
  },
};

describe('ManageData View', () => {
  it('should mount', async () => {
    const wrapper = shallowMount(ManageData, {
      propsData: { selectedRow: ['hello'] },
      mocks: {
        $route,
      },
    });
    await wrapper.setData({
      $route,
    });
    expect(wrapper.vm.$options.name).toMatch('ManageData');
    // ManageData.mounted.call({ active: 'published' });
  });

  it('should reset selected rows', () => {
    const mockThis = {
      selectedRows: ['hello', 'world'],
      resetSelectedRows: jest.fn(),
      allTableData: null,
    };
    ManageData.methods.resetSelectedRows.call(mockThis);
    ManageData.watch.activeTab.call(mockThis, 'deleted');
    expect(mockThis.selectedRows.length).toBeFalsy();
  });

  it('should close modal', () => {
    const mockThis = {
      entered: 'hello',
      modalOpen: true,
    };
    ManageData.methods.closeModal.call(mockThis);
    expect(mockThis.entered).toMatch('');
    expect(mockThis.modalOpen).toBeFalsy();
  });
  it('should open modal and set active modal', () => {
    const mockThis = {
      modalOpen: false,
      activeModal: null,
    };
    ManageData.methods.confirmAction.call(mockThis, 'publish');
    expect(mockThis.modalOpen).toBeTruthy();
    expect(mockThis.activeModal).toMatch('publish');
  });});
