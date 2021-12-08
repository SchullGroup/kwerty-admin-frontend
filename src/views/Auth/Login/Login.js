import { mapActions } from 'vuex';
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
    user: {
      email: '',
      password: '',
    },
  }),
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    async loginUser() {
      const { user: { email, password } } = this;
      this.isLoading = true;
      if (!email || !password) return;
      try {
        const user = await this.login({
          user: this.user,
        });
        if (!user.error) {
          this.$toast.show({ message: 'Successfully Logged In' });
          this.$router.push('/');
        } else {
          this.$toast.show({ message: user.error });
        }
      } catch (error) {
        this.$toast.show({ message: error });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
