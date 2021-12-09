import { mapActions } from 'vuex';
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
    email: '',
  }),
  methods: {
    ...mapActions({
      forgot: 'auth/forgotPassword',
    }),
    async forgotPassword() {
      this.isLoading = true;
      try {
        const response = await this.forgot({ user: { email: this.email } });
        if (!response.error) {
          this.$toast.show({ message: response });
          this.$router.push('/check-inbox');
        }
      } catch (e) {
        this.$toast.show({ message: e });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
