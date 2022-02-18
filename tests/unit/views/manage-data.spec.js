import { shallowMount } from '@vue/test-utils';
import ManageData from '@/views/Database/Manage/Manage.vue';
import ManageSingleData from '@/views/Database/Manage/SingleData.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

const $route = {
  query: {
    active: 'published',
  },
};
const data = {
  indicatorName: 'some name',
  category: 'economy',
  country: 'poland',
};

// eslint-disable-next-line no-unused-vars
const mockData = [
  {
    point: 'year',
    value: '2000',
  },
  {
    point: 'year',
    value: '2000',
  },
  {
    point: 'year',
    value: '2000',
  },
  {
    point: 'year',
    value: '2000',
  },
];

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
    expect(wrapper.vm.$options.name).toMatch('ManageData');
  });

  it('should reset selected rows', () => {
    const mockThis = {
      selectedRows: ['hello', 'world'],
      resetSelectedRows: jest.fn(),
      getData: jest.fn(),
      allTableData: null,
      $route: { query: { active: 'published' } },
    };
    ManageData.methods.resetSelectedRows.call(mockThis);
    ManageData.watch.activeTab.call(mockThis, 'deleted');
    ManageData.mounted.call(mockThis);
    expect(mockThis.selectedRows.length).toBeFalsy();
  });

  it('should call methods', () => {
    const wrapper = shallowMount(ManageData, {
      store,
      localVue,
      mocks: {
        $route,
      },
    });
    const mockThis = {
      getData: jest.fn(),
      fetchSingleData: jest.fn(),
    };
    ManageData.watch.search.call(mockThis);
    ManageData.watch.country.call(mockThis);
    ManageData.watch.category.call(mockThis);
    ManageData.watch.indicator.call(mockThis);
    expect(wrapper.vm.getData());
    expect(wrapper.vm.fetchSingleData({ pageId: '234tgbvbh7' }));
    expect(wrapper.vm.fetchSingleData({ pageId: '234tgbvbh7' }));
    expect(wrapper.vm.changePage());
    expect(wrapper.vm.actOnData({ action: 'act' }));
    expect(wrapper.vm.actOnData({ action: 'act' }));
    expect(wrapper.vm.actOnData({ action: 'act' }));
    expect(wrapper.vm.updateSingleData());
    expect(wrapper.vm.updateSingleData());
    // expect(wrapper.vm.updateSingleData());
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
      paginationData: {
        currentPage: 'value',
      },
    };
    expect(ManageData.computed.requiredMessage.call(mockThis)).toMatch('Publish 1 data set');
    mockThis.selected = 2;
    expect(ManageData.computed.requiredMessage.call(mockThis)).toMatch('Publish 2 data sets');
    // expect(ManageData.computed.set.call(mockThis)).toBeTruthy();
  });

  it('should do nothing if active query is invalid', () => {
    const mockThis = {
      $route: {
        query: {
          active: 'something',
        },
      },
      getData: jest.fn(),
    };
    // $route.query.active = 'something';
    expect(ManageData.mounted.call(mockThis));
  });
});

describe('single data', () => {
  it('mounts the component', () => {
    const wrapper = shallowMount(ManageSingleData, {
      propsData: {
        data,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('SingleData');
    // expect(wrapper.vm.addNewField(mockData));
    // expect(wrapper.vm.removeItem(mockData));
    // expect(wrapper.vm.editData(mockData));
    // ManageSingleData.watch.singleData.call(mockThis);
  });
});
