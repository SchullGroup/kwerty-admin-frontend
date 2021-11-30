<template>
  <k-card variant="in-modal" heading="Edit Admin">
    <form class="form__items">
      <k-input label="Surname" v-model="admin.lastName" />
      <k-input label="First Name" v-model="admin.firstName" />
      <k-input label="Email Address" type="email" v-model="admin.email" />
      <k-input label="Password" variant="password" />
      <k-input label="Set Role" type="select">
        <option value="Admin" class="option">Admin</option>
        <option value="Auditor" class="option">Auditor</option>
        <option value="Manager" class="option">Manager</option>
      </k-input>
      <div class="btn-wrapper">
        <k-button variant="link" @click="$emit('close')">Cancel</k-button>
        <k-button variant="secondary"  @click="$emit('close')">Finish</k-button>
      </div>
    </form>
  </k-card>
</template>

<script>
import { KCard, KInput, KButton } from '@/components';

export default {
  name: 'KEditAdmin',
  components: {
    KCard,
    KInput,
    KButton,
  },
  props: {
    currentadmin: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    admin: {},
  }),
  created() {
    const { firstName, lastName, email } = this.currentadmin;
    if (firstName && lastName && email) {
      this.admin = this.currentadmin;
    }
    return this.admin;
  },
};
</script>

<style lang="scss" scoped>
.btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
