import { mapActions, mapGetters } from 'vuex';
import errorHandler from '@/utils/error-handler';

export default {
  computed: {
    ...mapGetters({
      profile: 'auth/getProfile',
      user: 'auth/getUser',
    }),
  },
  methods: {
    ...mapActions({
      fetchprofile: 'auth/getProfile',
    }),
    async getProfile() {
      try {
        const { id, token } = this.user;
        await this.fetchprofile({ id, token });
      } catch (error) {
        this.$toast.show({ message: errorHandler(error).error });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
