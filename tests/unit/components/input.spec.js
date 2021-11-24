import { shallowMount } from '@vue/test-utils';
import { KInput } from '@/components';

describe('Input Component', () => {
  let wrapper = null;
  let mockEventObject;
  let mockProps;

  beforeAll(() => {
    wrapper = shallowMount(KInput, {
      propsData: {
        label: 'Name',
      },
    });
    mockEventObject = {
      target: { classList: { contains: () => true } },
      stopPropagation: () => {},
    };
    mockProps = {
      type: 'password',
      variant: 'password',
      togglePasswordType: jest.fn(),
      toggleSelectOpen: jest.fn(),
      isCustomSelect: false,
      isSelectOpen: false,
      overrideType: null,
      $refs: {
        list: {
          addEventListener: jest.fn(),
        },
      },
    };
  });

  it('should mount', () => {
    expect(wrapper.vm.$options.name).toMatch('KInput');
  });

  it('should update input element', async () => {
    const inputElement = wrapper.find('input');
    await inputElement.setValue('Hello World!');
    expect(await inputElement.element.value).toContain('Hello World!');
  });

  it('should emit input event', async () => {
    const inputElement = wrapper.find('input');
    await inputElement.trigger('change');
    expect(wrapper.emitted()).toHaveProperty('input');
  });

  it('should have all methods', () => {
    expect(wrapper.vm.togglePasswordType());
    expect(wrapper.vm.toggleSelectOpen());
    expect(wrapper.vm.listenForSelect());
    expect(wrapper.vm.selectOption(mockEventObject));
    expect(wrapper.vm.closeOptionsHandler(mockEventObject));
    expect(wrapper.vm.iconClicked());

    KInput.methods.listenForSelect.call(mockProps);
    expect(mockProps.$refs.list.addEventListener).toBeCalled();
  });

  it('should call right method on icon click', async () => {
    KInput.methods.iconClicked.call(mockProps, mockEventObject);
    expect(mockProps.togglePasswordType).toBeCalled();

    KInput.methods.togglePasswordType.call(mockProps);
    expect(mockProps.overrideType).toBe('text');

    mockProps.variant = 'select';
    mockProps.isCustomSelect = true;
    KInput.methods.iconClicked.call(mockProps, mockEventObject);
    expect(mockProps.toggleSelectOpen).toBeCalled();
  });

  it('should render native select correctly', () => {
    wrapper.setProps({ type: 'select', variant: 'native' });
    expect(wrapper.find('select')).toBeTruthy();
  });

  it('should show password if variant is password and type is text', () => {
    mockProps = { variant: 'password', overrideType: 'text' };
    expect(KInput.computed.passwordVisible.call(mockProps)).toBe(true);
  });

  it('should close options and click element below', async () => {
    const target = {
      parentElement: true,
    };
    wrapper.vm.clickElementBelow.call(mockProps, target, 0, 0)();
  });
});
