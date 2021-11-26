import { KAuth, KInput, KButton } from '@/components';

export default {
  name: 'Login',
  components: {
    KAuth,
    KInput,
    KButton,
  },
  data: () => ({
    isLoading: false,
  }),
};
