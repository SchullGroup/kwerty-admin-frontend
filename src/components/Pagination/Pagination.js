import iconBack from '@/assets/iconBack.svg';
import iconNext from '@/assets/iconNext.svg';

export default {
  name: 'KPagination',
  data: () => ({
    iconBack,
    iconNext,
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
  },
  methods: {
    nextPage() {
      this.$emit('goToNext');
    },
    prevPage() {
      this.$emit('goToPrev');
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
