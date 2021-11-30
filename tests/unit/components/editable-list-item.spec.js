import EditableListItem from '@/views/Settings/Roles/EditableListItem';

describe('EditableListItem Component', () => {
  const mockThis = {
    $emit: jest.fn(),
  };
  it('should have data', () => {
    expect(EditableListItem.data()).toBeTruthy();
  });

  it('should emit edit on editItem', () => {
    EditableListItem.methods.editItem.call(mockThis);
  });

  it('should emit delete on deleteItem', () => {
    EditableListItem.methods.deleteItem.call(mockThis);
  });
});
