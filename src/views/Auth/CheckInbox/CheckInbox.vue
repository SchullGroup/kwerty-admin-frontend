<template>
  <k-auth :hasIcon="true" title="Check your inbox!">
    <template v-slot:description>
      <p>We sent a new password to your inbox. Please keep it safe next time.</p>
    </template>
    <form>
      <div class="form__items">
        <k-button :loading="isLoading" size="full">
          <router-link :to="{ name: 'Login' }">Log in to your dashboard</router-link>
        </k-button>
      </div>
    </form>
  </k-auth>
</template>

<script>
import CheckInbox from './CheckInbox';

export default CheckInbox;
</script>

<style lang="scss" src="./CheckInbox.scss" scoped></style>
