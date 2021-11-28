<template>
  <div class="settings__content">
    <h1>Profile</h1>
    <div class="settings__section">
      <h3>Update profile picture</h3>
      <div class="profile">
        <div class="profile__media">
          <img src="@/assets/avatar.png" alt="Profile picture">
        </div>
        <k-button variant="tertiary">Change avatar</k-button>
      </div>
    </div>
    <div class="settings__section">
      <h3>Account Information</h3>
      <div class="form__grid">
        <k-input
          label="Surname"
          placeholder="Surname"
          disabled
          v-model="user.lastName" />
        <k-input
          label="First name"
          placeholder="First Name"
          disabled
          v-model="user.firstName" />
      </div>
      <k-input
        label="Email address"
        type="email"
        placeholder="Email Address"
        disabled
        v-model="user.email" />
    </div>
    <div class="settings__section settings__section--with-line">
      <h3>Change Password</h3>
      <div class="profile">
        <div class="settings__text">
          <p>We will send you a new secure password to your registered email address.</p>
          <p class="text-light">You cannot set a custom password for security purposes.</p>
        </div>
        <k-button variant="tertiary">Set new password</k-button>
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
        <k-button variant="tertiary" negative>Log out</k-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { KInput, KButton } from '@/components';

export default {
  name: 'ProfileSettings',
  components: {
    KInput,
    KButton,
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
    }),
  },
};
</script>
<style lang="scss" scoped src="./Settings.scss"></style>
