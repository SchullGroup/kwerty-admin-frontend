import { KAuth, KInput, KButton } from '@/components';

export default {
  name: 'ResetPassword',
  components: {
    KAuth,
    KInput,
    KButton,
  },
  data: () => ({
    isLoading: false,
  }),
};
