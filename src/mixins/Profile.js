import { mapActions, mapGetters } from 'vuex';

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
      this.isLoading = true;
      try {
        const { id, token } = this.user;
        await this.fetchprofile({ id, token });
      } catch (error) {
        this.$toast.show({ message: error });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
