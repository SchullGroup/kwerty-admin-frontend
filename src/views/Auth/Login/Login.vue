<template>
  <k-auth title="Welcome to Admin.">
    <template v-slot:description>
      <p>
        Sign in to access your dashboard. If you can’t login, please
        <span><router-link to="/reset-password">contact the admin </router-link></span>
        to resolve your issue.
      </p>
    </template>
    <form class="form__items" @submit.prevent="loginUser">
      <k-input label="Your email address" type="email" name="email" v-model="user.email" />
      <k-input
        label="Password"
        type="password"
        variant="password"
        name="password"
        v-model="user.password"
      ></k-input>
      <k-button :loading="isLoading" size="full" submit>Sign in to your dashboard</k-button>
    </form>
  </k-auth>
</template>

<script>
import Login from './Login';

export default Login;
</script>

<style lang="scss" src="./Login.scss" scoped></style>
