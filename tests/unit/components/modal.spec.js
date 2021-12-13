import KModal from '../../../src/components/Modal/Modal';

describe('Modal Component', () => {
  it('should be open when given truthy open prop', () => {
    const mockProps = { open: true };
    expect(KModal.computed.isOpen.call(mockProps)).toBeTruthy();
    mockProps.open = false;
    expect(KModal.computed.isOpen.call(mockProps)).toBeFalsy();
  });

  it('should emit close when background clicked', async () => {
    const mockThis = {
      $emit: jest.fn(),
    };
    const mockArgs = {
      target: {
        classList: {
          contains: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
        },
      },
    };
    await KModal.methods.closeModal.call(mockThis, mockArgs);
    await KModal.methods.closeModal.call(mockThis, mockArgs);
    expect(mockThis.$emit).toBeCalledWith('close');
  });
});
