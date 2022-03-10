<template>
  <k-card variant="in-modal" heading="Add new Admin">
    <form class="form__items" @submit.prevent="handleAddAdmin">
      <k-input label="Surname" v-model='admin.lastName' />
      <k-input label="First Name" v-model='admin.firstName' />
      <k-input label="Email Address" type="email" v-model='admin.email' />
      <k-input label="Password" type="password" v-model='password' disabled/>
      <k-input v-model='admin.roleId' :optionsDisplay='rolesDisplay' label='Set Role'
               type='select'>
      </k-input>
      <div class="btn-wrapper">
        <k-button variant="link" @click="$emit('close')">Cancel</k-button>
        <k-button variant="secondary" :loading='sending' submit>Finish</k-button>
      </div>
    </form>
  </k-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import rolesDisplay from '@/utils/rolesDisplay';
import { KCard, KInput, KButton } from '@/components';

export default {
  name: 'KAddAdmin',
  components: {
    KCard,
    KInput,
    KButton,
  },
  data: () => ({
    admin: {},
    password: '**********',
    sending: false,
  }),
  computed: {
    ...mapGetters({
      roles: 'roles/getAll',
      user: 'auth/getUser',
    }),
    rolesDisplay() {
      if (!Array.isArray(this.roles)) return {};
      return rolesDisplay(this.roles);
    },
  },
  methods: {
    ...mapActions({
      addAdmin: 'admin/addAdmin',
    }),
    async handleAddAdmin() {
      const { admin } = this;
      this.sending = true;
      try {
        const response = await this.addAdmin({ admin });
        if (response.error) throw Error(response.error);
        this.$toast.show({ message: response });
        this.$emit('close');
      } catch (e) {
        this.$toast.show({ message: e.message });
      } finally {
        this.sending = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
