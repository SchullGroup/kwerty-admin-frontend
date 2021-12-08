<template>
  <k-auth title="Reset your password.">
    <template v-slot:description>
      <p>Confirm your email address to receive your new password in your inbox.</p>
    </template>
    <form @submit.prevent="forgotPassword">
      <div class="form__items">
        <k-input label="Your email address" type="email" v-model="email"/>
        <k-button :loading="isLoading" size="full" submit>Send my new password</k-button>
      </div>
      <k-button class="btn" variant="link" size="full">
        <router-link :to="{ name: 'Login' }">Back to login</router-link>
      </k-button>
    </form>
  </k-auth>
</template>

<script>
import ResetPassword from './ResetPassword';

export default ResetPassword;
</script>

<style lang="scss" src="./ResetPassword.scss" scoped></style>
