import { shallowMount } from '@vue/test-utils';
import ManageSingleData from '@/views/Database/Manage/SingleData.vue';

const mockRemove = {
  data: [
    {
      value: '34',
      period: 'Q',
    },
    {
      value: '34',
      period: 'Q',
    },
  ],
  point: 1,
};

const mockThis = {
  data: {
    data: [
      {
        point: 'Q1',
        value: '3456',
      },
      {
        point: 'Q1',
        value: '3456',
      },
    ],
  },
  newData: {
    period: 'Q1',
    value: '3456',
  },
  point: 'Q',
  val: '234',
};

describe('single data', () => {
  it('mounts the component', () => {
    const wrapper = shallowMount(ManageSingleData, {
      propsData: {
        data: {
          indicatorName: 'some name',
          category: 'economy',
          country: 'poland',
        },
        nameOfIndicator: 'some name',
        updateSingleData: jest.fn(),
        dataTags: ['money', 'finance'],
        isEditable: false,
        isEditing: false,
      },
    });
    expect(wrapper.vm.$options.name).toMatch('SingleData');
  });
  it('runs the methods in the component', () => {
    ManageSingleData.methods.addNewField.call(mockThis);
    ManageSingleData.methods.editData.call(mockThis);
  });
  it('runs the remove methods in the component', () => {
    ManageSingleData.methods.removeItem.call(mockRemove, 0, [1, 2, 3]);
  });
});
