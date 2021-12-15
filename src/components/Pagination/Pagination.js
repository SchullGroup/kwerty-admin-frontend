import iconBack from '@/assets/iconBack.svg';
import iconNext from '@/assets/iconNext.svg';

export default {
  name: 'KPagination',
  data: () => ({
    iconBack,
    iconNext,
  }),
  props: {
    currentPageStart: {
      type: Number,
      required: true,
    },
    currentPageEnd: {
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
};
