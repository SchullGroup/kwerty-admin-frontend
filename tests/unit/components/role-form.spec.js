import { shallowMount } from '@vue/test-utils';
import RoleForm from '@/views/Settings/Roles/RoleForm.vue';
import { localVue, successStore as store } from '../../utils/local-vue';

describe('RoleForm', () => {
  let mockThis = null;
  let wrapper = null;
  const edit = {
    id: 1,
    name: 'Data Analyst',
    description: 'This is just some text',
    permissions: JSON.stringify({ datasets: ['create'] }),
  };

  beforeAll(() => {
    wrapper = shallowMount(RoleForm, {
      localVue,
      store,
      propsData: {
        edit,
      },
    });
  });

  beforeEach(() => {
    mockThis = {
      edit,
      permissions: { datasets: [] },
      dataFromProps: jest.fn(),
    };
  });

  it('should mount', () => {
    expect(wrapper.vm.$options.name).toMatch('RoleForm');
  });

  it('should have default data', () => {
    expect(RoleForm.data()).toBeTruthy();
  });

  it('should set formValue on mounted', () => {
    RoleForm.mounted.call(mockThis);
  });

  it('should set formValue empty if edit prop is falsy', () => {
    mockThis.edit = null;
    RoleForm.mounted.call(mockThis);
    expect(mockThis.formValue).toMatchObject({});
  });

  it('should get data from props', () => {
    const { edit } = mockThis;
    RoleForm.methods.dataFromProps.call(mockThis, edit);
    expect(mockThis.formValue.name).toMatch(edit.name);
    expect(mockThis.formValue.description).toMatch(edit.description);
  });

  it('should add role', () => {
    wrapper.setProps({
      edit: null,
    });
    wrapper.vm.handleSubmit();
  });

  it('should edit role', () => {
    wrapper.vm.handleSubmit();
    wrapper.vm.handleSubmit();
  });
});
