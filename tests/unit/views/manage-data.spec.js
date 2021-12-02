import { shallowMount } from '@vue/test-utils';
import ManageData from '@/views/Database/Manage/Manage.vue';

describe('ManageData View', () => {
  it('should mount', () => {
    const wrapper = shallowMount(ManageData, {
      propsData: { selectedRow: ['hello'] },
    });
    expect(wrapper.vm.$options.name).toMatch('ManageData');
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
  });
});
