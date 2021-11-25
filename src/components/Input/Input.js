import ShowIcon from './showIcon.vue';
import HideIcon from './hideIcon.vue';
import DropdownIcon from './dropdownIcon.vue';

export default {
  name: 'KInput',
  mounted() {
    this.innerValue = this.value;
    this.listenForSelect();
  },
  data: () => ({
    innerValue: null,
    overrideType: null,
    isSelectOpen: false,
  }),
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
      default: () => 'text',
    },
    disabled: {
      type: Boolean,
    },
    error: {
      type: String,
    },
    variant: {
      type: String,
    },
  },
  methods: {
    updateInput(e) {
      this.innerValue = e.target.value;
      this.$emit('input', this.innerValue);
    },
    togglePasswordType() {
      const { overrideType } = this;
      const type = overrideType || this.type;
      this.overrideType = type === 'password' ? 'text' : 'password';
    },
    listenForSelect() {
      if (this.$refs.list) {
        this.$refs.list.addEventListener('click', this.selectOption);
      }
    },
    toggleSelectOpen() {
      this.isSelectOpen = !this.isSelectOpen;
    },
    selectOption(e) {
      const { target } = e;
      if (target.classList.contains('option')) {
        this.innerValue = target.value;
        this.$emit('input', target.value);
      }
    },
    clickElementBelow(target, x, y) {
      return () => {
        try {
          const clickTarget = document.elementFromPoint(x, y);
          if (
            clickTarget === target.parentElement
            || clickTarget === target.parentElement.querySelector('label')
            || clickTarget === target.parentElement.querySelector('svg')
            || clickTarget === target.parentElement.querySelector('.input__icon')
          ) {
            return;
          }

          clickTarget.click();
        } catch (e) { console.log(e.message); }
      };
    },
    closeOptionsHandler(e) {
      const { target, clientX: x, clientY: y } = e;
      this.isSelectOpen = false;

      // Click element covered by overlay
      setTimeout(this.clickElementBelow(target, x, y), 0);
    },
    iconClicked() {
      if (this.variant === 'password') this.togglePasswordType();
      else if (this.isSelect && !this.isSelectOpen) {
        this.toggleSelectOpen();
      }
    },
  },
  computed: {
    passwordVisible() {
      const { variant, overrideType } = this;
      return variant === 'password' && overrideType === 'text';
    },
    isNativeSelect() {
      return this.type === 'select' && this.variant === 'native';
    },
    isSelect() {
      return this.type === 'select';
    },
  },
  components: {
    ShowIcon,
    HideIcon,
    DropdownIcon,
  },
};
