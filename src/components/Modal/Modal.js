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
    uploading: {
      type: Boolean,
    },
  },
  computed: {
    isOpen() {
      return this.open || false;
    },
  },
  methods: {
    closeModal(e) {
      if (e.target.classList.contains('modal')) {
        this.$emit('close');
      }
    },
  },
};
