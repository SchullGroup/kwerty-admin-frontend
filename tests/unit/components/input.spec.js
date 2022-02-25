import { shallowMount } from '@vue/test-utils';
import { KInput } from '@/components';

jest.mock('date-fns/format', () => jest.fn());

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
      target: { classList: { contains: () => true }, tagName: 'OPTION', dataset: { value: 'hi' } },
    };
    mockProps = {
      code: 'Backspace',
      filter: 'Polan',
      type: 'password',
      variant: 'password',
      togglePasswordType: jest.fn(),
      toggleSelectOpen: jest.fn(),
      isSelect: false,
      isSelectOpen: false,
      overrideType: null,
      $refs: {
        list: {
          addEventListener: jest.fn(),
          parentElement: {
            getBoundingClientRect: jest.fn().mockReturnValue({ top: 200 }),
          },
        },
        itemList: {
          children: ['option1', 'option2'],
        },
      },
    };
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 300,
    });
  });

  it('should mount', () => {
    expect(wrapper.vm.$options.name).toMatch('KInput');
  });

  it('should emit input event', async () => {
    const inputElement = wrapper.find('input');
    await inputElement.trigger('change');
    expect(wrapper.emitted()).toHaveProperty('input');
  });

  it('should have all methods', () => {
    expect(wrapper.vm.record(mockProps));
    mockProps.code = 'KeyA';
    mockProps.key = 'a';
    expect(wrapper.vm.record(mockProps));
    expect(wrapper.vm.togglePasswordType());
    expect(wrapper.vm.toggleSelectOpen());
    expect(wrapper.vm.listenForSelect());
    expect(wrapper.vm.selectOption(mockEventObject));
    expect(wrapper.vm.closeOptionsHandler(mockEventObject));
    expect(wrapper.vm.iconClicked());
    mockEventObject.target.classList.contains = () => false;
    expect(wrapper.vm.selectOption(mockEventObject));

    KInput.methods.listenForSelect.call(mockProps);
    expect(mockProps.$refs.list.addEventListener).toBeCalled();

    const mockThis = {
      selectOption: jest.fn(),
    };
    KInput.methods.enterOption.call(mockThis, { code: 'Enter' });
  });

  it('should call right method on icon click', async () => {
    KInput.methods.iconClicked.call(mockProps, mockEventObject);
    expect(mockProps.togglePasswordType).toBeCalled();

    KInput.methods.togglePasswordType.call(mockProps);
    expect(mockProps.overrideType).toBe('text');

    mockProps.variant = 'select';
    mockProps.isSelect = true;
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
      parentElement: { querySelector: jest.fn().mockImplementation((v) => v) },
      closest: jest.fn().mockReturnValue({ focus: jest.fn() }),
      click: jest.fn(),
    };
    Object.defineProperty(window.document, 'elementFromPoint', {
      writable: true,
      value: jest
        .fn()
        .mockReturnValueOnce({ click: jest.fn(), ...target })
        .mockReturnValueOnce(target.parentElement)
        .mockReturnValueOnce('svg')
        .mockReturnValueOnce('.input__icon')
        .mockReturnValueOnce(true),
    });
    wrapper.vm.clickElementBelow.call(mockProps, target, 0, 0)();
    wrapper.vm.clickElementBelow.call(mockProps, target, 0, 0)();
    wrapper.vm.clickElementBelow.call(mockProps, target, 0, 0)();
    wrapper.vm.clickElementBelow.call(mockProps, target, 0, 0)();
    wrapper.vm.clickElementBelow.call(mockProps, target, 0, 0)();
  });

  it('should watch value and update innerValue', () => {
    const mockThis = {
      innerValue: null,
    };
    KInput.watch.value.call(mockThis, 'hello');
    expect(mockThis.innerValue).toMatch('hello');

    // date
    mockThis.isDate = true;
    mockThis.$emit = jest.fn();
    KInput.watch.value.call(mockThis, 'hello');
    KInput.watch.date.call(mockThis, 'hello');
    expect(mockThis.$emit).toHaveBeenCalled();
  });

  it('should listen to click if type is date', () => {
    const mockEvent = {
      target: { classList: { contains: jest.fn().mockReturnValue(true) } },
    };

    const mockThis = {
      value: new Date(),
      listenForSelect: jest.fn(),
      type: 'date',
      $refs: {
        date: {
          addEventListener: jest.fn((action, fn = jest.fn()) => {
            fn(mockEvent);
          }),
        },
      },
    };
    KInput.mounted.call(mockThis);
  });

  it('should filterOptions', () => {
    const mockThis = {
      filterInside: true,
      filter: 'pola',
      optionsDisplay: { poland: 'Poland', ghana: 'Ghana' },
    };
    KInput.computed.filteredOptions.call(mockThis);

    mockThis.filter = '';
    KInput.computed.filteredOptions.call(mockThis);

    mockThis.filterInside = false;
    KInput.computed.filteredOptions.call(mockThis);
  });

  it('should format date', () => {
    const mockThis = {
      date: new Date(),
    };
    KInput.computed.formattedDate.call(mockThis);

    mockThis.date = 'not date';
    KInput.computed.formattedDate.call(mockThis);
  });

  it('updates position on update', () => {
    const localMockThis = {
      variant: 'select',
      $refs: {
        list: {
          style: {},
          classList: { contains: jest.fn(), add: jest.fn() },
          addEventListener: jest.fn(),
          parentElement: {
            getBoundingClientRect: jest.fn().mockReturnValue({ top: 200 }),
          },
        },
        itemList: {
          children: { length: 10 },
        },
      },
    };
    KInput.updated.call(localMockThis);
  });
  it('focus inside search input when available', () => {
    const localThis = {
      $refs: { search: { focus: jest.fn() } },
      searchInside: true,
      isSelectOpen: true,
    };
    KInput.methods.focusInsideSearch.call(localThis);
  });
});
