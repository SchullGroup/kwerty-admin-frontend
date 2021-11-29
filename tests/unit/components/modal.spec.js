import KModal from '../../../src/components/Modal/Modal';

describe('Modal Component', () => {
  it('should be open when given truthy open prop', () => {
    const mockProps = { open: true };
    expect(KModal.computed.isOpen.call(mockProps)).toBeTruthy();
    mockProps.open = false;
    expect(KModal.computed.isOpen.call(mockProps)).toBeFalsy();
  });
});
