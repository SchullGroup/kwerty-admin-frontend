import iconFirstPage from '@/assets/iconFirstPage.svg';
import iconLastPage from '@/assets/iconLastPage.svg';
import iconBack from '@/assets/iconBack.svg';
import iconNext from '@/assets/iconNext.svg';

export default {
  name: 'KPagination',
  data: () => ({
    iconBack,
    iconNext,
    iconFirstPage,
    iconLastPage,
  }),
  props: {
    page: {
      type: Number,
      required: true,
    },
    maxItemsOnPage: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    variant: {
      type: String,
    },
    forTable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    nextPage() {
      this.$emit('goToNext');
    },
    prevPage() {
      this.$emit('goToPrev');
    },
    firstPage() {
      this.$emit('goToFirst');
    },
    lastPage() {
      this.$emit('goToLast');
    },
  },
  computed: {
    currentPageEnd() {
      const { totalItems, maxItemsOnPage } = this;
      const nextEnd = (this.page - 1) * maxItemsOnPage + maxItemsOnPage;
      return totalItems < nextEnd ? totalItems : nextEnd;
    },
    currentPageStart() {
      const { maxItemsOnPage } = this;
      return (this.page - 1) * maxItemsOnPage + 1;
    },
  },
};
