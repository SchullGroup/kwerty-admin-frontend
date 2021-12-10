<template>
  <div class="settings__content">
    <h1>Profile</h1>
    <div class="settings__section">
      <h3>Update profile picture</h3>
      <div class="profile">
        <div class="profile__media">
          <img src="@/assets/avatar.png" alt="Profile picture" />
        </div>
        <k-button variant="tertiary">Change avatar</k-button>
      </div>
    </div>
    <div class="settings__section">
      <h3>Account Information</h3>
      <div class="form__grid">
        <k-input label="Surname" placeholder="Surname" disabled v-model="profile.lastName" />
        <k-input label="First name" placeholder="First Name" disabled v-model="profile.firstName" />
      </div>
      <k-input
        label="Email address"
        type="email"
        placeholder="Email Address"
        disabled
        v-model="profile.email"
      />
    </div>
    <div class="settings__section settings__section--with-line">
      <h3>Change Password</h3>
      <div class="profile">
        <div class="settings__text">
          <p>We will send you a new secure password to your registered email address.</p>
          <p class="text-light">You cannot set a custom password for security purposes.</p>
        </div>
        <k-button :loading="isLoading" variant="tertiary" @click="sendNewPassword"
          >Set new password</k-button
        >
      </div>
    </div>
    <div class="settings__section settings__section--with-line">
      <h1>Log Out</h1>
      <div class="profile">
        <div class="settings__text">
          <p>If you log out now, your session will be terminated.</p>
          <p class="text-light">
            You will need to provide your login details to access your dashboard again.
          </p>
        </div>
        <k-button @click="logout" variant="tertiary" negative>Log out</k-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { KInput, KButton } from '@/components';
import ProfileMixins from '@/mixins/Profile';

export default {
  name: 'ProfileSettings',
  components: {
    KInput,
    KButton,
  },
  data: () => ({
    isLoading: false,
  }),
  mixins: [ProfileMixins],
  computed: {
    ...mapGetters({
      profile: 'auth/getProfile',
      user: 'auth/getUser',
      admins: 'admin/getAll',
    }),
  },
  methods: {
    ...mapMutations({
      reset: 'auth/RESET',
    }),
    ...mapActions({
      resetPassword: 'auth/resetPassword',
      fetchAdmin: 'admin/fetchAll',
      fetchRoles: 'roles/fetchAll',
    }),
    async sendNewPassword() {
      this.isLoading = true;
      const { user: { token } } = this;
      try {
        const passwordSent = await this.resetPassword({ token });
        this.$toast.show({ message: passwordSent });
      } catch (error) {
        this.$toast.show({ message: error });
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      this.reset();
      this.$router.push({
        name: 'Login',
      });
    },
  },
  created() {
    const { token } = this.user;
    if (Array.isArray(this.admins) && !this.admins.length) {
      try {
        this.fetchAdmin({ token });
        this.fetchRoles({ token });
      } catch (e) {
        this.$toast.show({ message: e });
      }
    }
  },
};
</script>
<style lang="scss" scoped src="./Settings.scss"></style>
