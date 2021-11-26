<template>
  <k-auth title="Welcome to Admin.">
    <template v-slot:description>
      <p>
        Sign in to access your dashboard. If you can’t login, please
        <span>contact the admin </span> to resolve your issue.
      </p>
    </template>
    <form class="form__items">
      <k-input label="Your email address" type="email" />
      <k-input label="Password" type="password" variant="password" />
      <k-button :loading="isLoading" size="full">Sign in to your dashboard</k-button>
    </form>
  </k-auth>
</template>

<script>
import Login from './Login';

export default Login;
</script>

<style lang="scss" src="./Login.scss" scoped></style>
