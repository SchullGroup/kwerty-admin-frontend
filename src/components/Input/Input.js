/* eslint-disable vue/max-len */
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import format from 'date-fns/format';

import Clipboard from '@/utils/Clipboard';

import ShowIcon from './showIcon.vue';
import HideIcon from './hideIcon.vue';
import DropdownIcon from './dropdownIcon.vue';

export default {
  name: 'KInput',
  components: {
    ShowIcon,
    HideIcon,
    DropdownIcon,
    DatePicker,
  },
  data: () => ({
    innerValue: null,
    overrideType: null,
    isSelectOpen: false,
    filter: '',
    date: null,
    searchInputPath:
      // eslint-disable-next-line vue/max-len
      'M11.0207 10.078L13.876 12.9327L12.9327 13.876L10.078 11.0207C9.01582 11.8722 7.69466 12.3353 6.33333 12.3333C3.02133 12.3333 0.333328 9.64534 0.333328 6.33334C0.333328 3.02134 3.02133 0.333336 6.33333 0.333336C9.64533 0.333336 12.3333 3.02134 12.3333 6.33334C12.3353 7.69467 11.8721 9.01583 11.0207 10.078ZM9.68333 9.58334C10.5294 8.71326 11.0019 7.54696 11 6.33334C11 3.75467 8.91133 1.66667 6.33333 1.66667C3.75466 1.66667 1.66666 3.75467 1.66666 6.33334C1.66666 8.91134 3.75466 11 6.33333 11C7.54695 11.0019 8.71325 10.5294 9.58333 9.68334L9.68333 9.58334V9.58334Z',
    copyIconPath:
      // eslint-disable-next-line vue/max-len
      'M4 4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1V15C18 15.2652 17.8946 15.5196 17.7071 15.7071C17.5196 15.8946 17.2652 16 17 16H14V19C14 19.552 13.55 20 12.993 20H1.007C0.875127 20.0008 0.744397 19.9755 0.622322 19.9256C0.500247 19.8757 0.389233 19.8022 0.295659 19.7093C0.202084 19.6164 0.127793 19.5059 0.0770543 19.3841C0.0263156 19.2624 0.000129374 19.1319 0 19L0.00300002 5C0.00300002 4.448 0.453 4 1.01 4H4ZM2.003 6L2 18H12V6H2.003ZM6 4H14V14H16V2H6V4Z',
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
      type: Object,
    },
    filterInside: {
      type: Boolean,
    },
    searchInside: {
      type: String,
      default: '',
    },
    reactive: {
      type: Boolean,
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
    const forDropdown = this.$refs.list && this.$refs.itemList;
    const forDate = this.$refs.date;
    if (forDropdown || forDate) {
      let pos; let list; let itemList; let date;
      if (forDate) {
        pos = this.$refs.date.parentElement.getBoundingClientRect();
        date = this.$refs.date;
      } else {
        list = this.$refs.list;
        itemList = this.$refs.itemList;
        pos = list.parentElement.getBoundingClientRect();
      }
      const fromTop = pos.top + 76;
      const screenH = window.innerHeight;
      /*
       * height is (number of children x 48px) + 32px (margins)
       * unless (number of item > 10),
       * then height is (10 x 48 + 32)
       * */
      let numberOfChildren; let heightFromChildren;
      if (forDropdown) {
        numberOfChildren = itemList.children.length > 9 ? 9 : itemList.children.length;
        if (this.searchInside) {
          numberOfChildren = itemList.children.length > 7 ? 7 : itemList.children.length;
        }
        heightFromChildren = numberOfChildren * 48 + (this.searchInside ? 96.25 : 32);
      } else {
        heightFromChildren = 282;
      }

      // if height is longer than screen height,  set height to 95% of screen height
      const listLongerThanScreen = heightFromChildren < screenH;
      const height = listLongerThanScreen ? heightFromChildren : 0.95 * screenH;

      // check if options list overflows
      const overflow = screenH - (fromTop + height);
      let item;
      if (forDropdown) { item = list; } else { item = date; }

      if (fromTop + height < screenH) item.style.top = '76px';

      // shift up if overflows
      if (overflow < 0) {
        item.style.top = `${overflow + 64}px`;
      }

      // make list scrollable when option list contains more than 10 items
      if (forDropdown) {
        if (
          this.searchInside
          && itemList.children.length > 7
          && !list.classList.contains('scrollable')
        ) {
          list.classList.add('scrollable');
        } else if (itemList.children.length > 9 && !list.classList.contains('scrollable')) {
          list.classList.add('scrollable');
        }
      }
    }
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
    filter(val) {
      this.$emit('search', val);
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
    isCopy() {
      return this.variant === 'copyInput';
    },
    selectedOption() {
      return this.optionsDisplay ? this.optionsDisplay[this.value] : null;
    },
    filteredOptions() {
      const toFilter = this.filterInside || !!this.searchInside;
      if (!toFilter) return this.optionsDisplay;
      if (this.filter) {
        const keys = Object.keys(this.optionsDisplay);
        // eslint-disable-next-line max-len
        const filtered = keys.filter((key) => key.toLowerCase().includes(this.filter.toLowerCase()));
        filtered.sort((a, b) => {
          if (a.startsWith(this.filter) && !b.startsWith(this.filter)) {
            return -1;
          }
          if (!a.startsWith(this.filter) && b.startsWith(this.filter)) {
            return 1;
          }
          return 0;
        });
        return filtered.reduce(
          (result, current) => ({
            ...result,
            [current]: this.optionsDisplay[current],
          }),
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
      if (!this.disabled) {
        this.isSelectOpen = !this.isSelectOpen;
        this.focusInsideSearch();
      }
    },
    focusInsideSearch() {
      const { search } = this.$refs;
      if (this.searchInside && search && this.isSelectOpen) {
        search.focus();
      }
    },
    selectOption(e) {
      const { target } = e;
      if (target.classList.contains('option') || target.tagName === 'OPTION') {
        this.innerValue = target.dataset.value;
        this.$emit('input', target.dataset.value);
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
          const closestInput = clickTarget.closest('.input');
          if (closestInput) closestInput.focus();
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
      } else if (this.isCopy) {
        this.copy();
      }
    },
    copy() {
      Clipboard.copy(this.value);
      this.$toast.show({ message: 'Copied' });
    },
  },
};
