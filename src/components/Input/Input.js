import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import format from 'date-fns/format';

import ShowIcon from './showIcon.vue';
import HideIcon from './hideIcon.vue';
import DropdownIcon from './dropdownIcon.vue';

export default {
  name: 'KInput',
  data: () => ({
    innerValue: null,
    overrideType: null,
    isSelectOpen: false,
    filter: '',
    date: null,
  }),
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: null,
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
    optionsDisplay: {
      type: null,
    },
    filterInside: {
      type: Boolean,
    },
    reactive: {
      type: Boolean,
    },
  },
  watch: {
    value(val) {
      if (this.isDate) {
        this.date = val;
        return;
      }
      this.innerValue = val;
    },
    date(val) {
      this.$emit('input', val);
    },
  },
  mounted() {
    this.innerValue = this.value;
    this.listenForSelect();
    this.filter = '';

    // for date
    if (this.type === 'date') this.overrideType = 'text';
    if (this.$refs.date) {
      this.$refs.date.addEventListener('click', (e) => {
        console.log('date is here');
        if (e.target.classList.contains('vc-day-content')) {
          this.isSelectOpen = false;
        }
      });
    }
  },
  updated() {
    if (this.$refs.list) {
      const { list } = this.$refs;
      const pos = list.parentElement.getBoundingClientRect();
      const fromTop = pos.top + 76;
      const screenH = window.innerHeight;
      /*
       * height is (number of children x 48px) + 32px (margins)
       * unless (number of item > 10),
       * then height is (10 x 48 + 32)
       * */
      const numberOfChildren = list.children.length > 10 ? 10 : list.children.length;
      const heightFromChildren = numberOfChildren * 48 + 32;

      // if height is longer than screen height,  set height to 95% of screen height
      const listLongerThanScreen = heightFromChildren < screenH;
      const height = listLongerThanScreen ? heightFromChildren : 0.95 * screenH;

      // check if options list overflows
      const overflow = screenH - (fromTop + height);
      if (fromTop + height < screenH) list.style.top = '76px';

      // shift up if overflows
      if (overflow < 0) {
        list.style.top = `${overflow + 64}px`;
      }

      // make list scrollable when option list contains more than 10 items
      if (list.children.length > 10 && !list.classList.contains('scrollable')) {
        list.classList.add('scrollable');
      }
    }
  },
  methods: {
    record(e) {
      const { filter } = this;
      if (e.code === 'Backspace') {
        this.filter = filter.slice(0, filter.length - 1);
        return;
      }
      if (e.code.startsWith('Key') || e.code.startsWith('Digit')) {
        this.filter += e.key.toLowerCase();
      }
    },
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
    enterOption(e) {
      if (e.code === 'Enter') {
        this.selectOption({ target: document.activeElement });
        this.isSelectOpen = false;
      }
    },
    toggleSelectOpen() {
      this.isSelectOpen = !this.isSelectOpen;
    },
    selectOption(e) {
      const { target } = e;
      if (target.classList.contains('option') || target.tagName === 'OPTION') {
        this.innerValue = target.value;
        this.$emit('input', target.value);
        this.filter = '';
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
        } catch (e) {
          console.log(e.message);
        }
      };
    },
    closeOptionsHandler(e) {
      const { target, clientX: x, clientY: y } = e;
      this.isSelectOpen = false;
      this.filter = '';
      // Click element covered by overlay
      setTimeout(this.clickElementBelow(target, x, y), 0);
    },
    iconClicked() {
      if (this.variant === 'password') this.togglePasswordType();
      else if ((this.isSelect || this.isDate) && !this.isSelectOpen) {
        this.toggleSelectOpen();
      }
    },
  },
  computed: {
    passwordVisible() {
      const { variant, overrideType } = this;
      return variant === 'password' && overrideType === 'text';
    },
    isSelect() {
      return this.type === 'select';
    },
    isDate() {
      return this.type === 'date';
    },
    selectedOption() {
      return this.optionsDisplay ? this.optionsDisplay[this.value] : null;
    },
    filteredOptions() {
      if (!this.filterInside) return this.optionsDisplay;
      if (this.filter) {
        const keys = Object.keys(this.optionsDisplay);
        const filtered = keys.filter((key) => key.includes(this.filter));
        return filtered.reduce(
          (result, current) => ({ ...result, [current]: this.optionsDisplay[current] }),
          {},
        );
      }

      return this.optionsDisplay;
    },
    formattedDate() {
      if (this.date instanceof Date) return format(this.date, 'dd-MM-yyyy');
      return '';
    },
  },
  components: {
    ShowIcon,
    HideIcon,
    DropdownIcon,
    DatePicker,
  },
};
