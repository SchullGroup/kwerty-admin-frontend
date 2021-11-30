import RoleForm from '@/views/Settings/Roles/RoleForm.vue';

describe('RoleForm', () => {
  const mockThis = {
    edit: {
      title: 'Data Analyst',
      description: 'This is just some text',
    },
  };

  it('should have default data', () => {
    expect(RoleForm.data()).toBeTruthy();
  });

  it('should set formValue on mounted', () => {
    RoleForm.mounted.call(mockThis);
    expect(mockThis.formValue.title).toMatch('Data Analyst');
  });

  it('should set formValue before Update', () => {
    mockThis.edit.title = 'Data Scientist';
    RoleForm.beforeUpdate.call(mockThis);
    expect(mockThis.formValue.title).toMatch('Data Scientist');
  });

  it('should set formValue empty if edit prop is falsy', () => {
    mockThis.edit = null;
    RoleForm.mounted.call(mockThis);
    RoleForm.beforeUpdate.call(mockThis);
    expect(mockThis.formValue).toMatchObject({});
  });
});
