<template>
  <k-auth :hasIcon="true" title="Check your inbox!">
    <template v-slot:description>
      <p>We sent a new password to your inbox. Please keep it safe next time.</p>
    </template>
    <form>
      <div class="form__items">
        <k-button @click="$router.push({ name: 'Login' })" :loading="isLoading" size="full">
          Log in to your dashboard
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
