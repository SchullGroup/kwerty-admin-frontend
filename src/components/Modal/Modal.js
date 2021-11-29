import KCard from '../Card/Card.vue';

export default {
  name: 'KModal',
  components: {
    KCard,
  },
  props: {
    open: {
      type: Boolean,
    },
  },
  computed: {
    isOpen() {
      return this.open || false;
    },
  },
};
