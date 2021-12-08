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
        const userProfile = await this.fetchprofile({ id, token });
        if (userProfile.error) {
          throw Error(userProfile.error);
        }
        this.isLoading = false;
      } catch (error) {
        this.$toast.show({ message: error });
      }
    },
  },
};
