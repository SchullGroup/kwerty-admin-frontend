<template>
  <k-card heading='Edit Admin' variant='in-modal'>
    <form class='form__items' @submit.prevent="finish">
      <k-input v-model='admin.lastName' label='Surname' />
      <k-input v-model='admin.firstName' label='First Name' />
      <k-input v-model='admin.email' label='Email Address' type='email' />
      <k-input v-model='password' disabled label='Password' type='password' />
      <k-input v-model='admin.roleId' :optionsDisplay='rolesDisplay' label='Set Role'
               type='select'>
      </k-input>
      <div class='btn-wrapper'>
        <k-button variant='link' @click="$emit('close')">Cancel</k-button>
        <k-button variant='secondary' :loading='sending' submit>Finish</k-button>
      </div>
    </form>
  </k-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import stringHelpers from '@/utils/string-helpers';
import rolesDisplay from '@/utils/rolesDisplay';
import { KButton, KCard, KInput } from '@/components';

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
    password: '**********',
    sending: false,
  }),
  computed: {
    ...mapGetters({
      roles: 'roles/getAll',
      user: 'auth/getUser',
      adminPagination: 'admin/getPagination',
    }),
    rolesDisplay() {
      if (!Array.isArray(this.roles)) return {};
      return rolesDisplay(this.roles);
    },
  },
  methods: {
    ...stringHelpers,
    ...mapActions(
      {
        updateAdmin: 'admin/editOtherAdmin',
        fetchAdmin: 'admin/fetchAll',
      },
    ),
    async finish() {
      const {
        admin: {
          id, firstName, lastName, email, roleId,
        },
      } = this;

      this.sending = true;
      try {
        const response = await this.updateAdmin({
          admin: {
            id, firstName, lastName, email, roleId,
          },
        });
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
  created() {
    const { firstName, lastName, email } = this.currentadmin;
    if (firstName && lastName && email) {
      this.admin = this.currentadmin;
    }
    return this.admin;
  },
};
</script>

<style lang='scss' scoped>
.btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
