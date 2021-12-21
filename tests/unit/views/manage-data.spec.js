import { shallowMount } from '@vue/test-utils';
import ManageData from '@/views/Database/Manage/Manage.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

const $route = {
  query: {
    active: 'published',
  },
};

describe('ManageData View', () => {
  it('should mount', async () => {
    const wrapper = shallowMount(ManageData, {
      localVue,
      store,
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
      getData: jest.fn(),
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
  it('should check if same', () => {
    const mockThis = {
      entered: 'hello',
      requiredMessage: 'hello',
    };
    expect(ManageData.computed.isSame.call(mockThis)).toBeTruthy();
  });
  it('should generate required message', () => {
    const mockThis = {
      activeModal: 'published',
      actionDisplays: {
        published: 'Publish',
      },
      selected: 1,
    };
    expect(ManageData.computed.requiredMessage.call(mockThis)).toMatch('Publish 1 data set');
    mockThis.selected = 2;
    expect(ManageData.computed.requiredMessage.call(mockThis)).toMatch('Publish 2 data sets');
  });

  it('should do nothing if active query is invalid', () => {
    $route.query.active = 'something';
    expect(ManageData.mounted.call({ $route, getData: jest.fn() })).toBeFalsy();
  });
});
