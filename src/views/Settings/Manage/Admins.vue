<template>
  <div class='admins'>
    <div v-for='admin in admins' :key='admin.email' :class="['admin__item']">
      <k-icons
        v-show='editAdmin'
        :class="['icons']"
        @delete='handleDeleteAdmin(admin.id)'
        @edit='handleEditAdmin(admin.id)'
      />
      <img alt='avatar' class='avatar-icon' src='@/assets/avatar.png' />
      <div class='admin-text'>
        <p class='name'>{{ titleCase(`${admin.firstName} ${admin.lastName}`) }}</p>
        <p class='role'>{{ snakeToTitle(admin.roleName) }}</p>
      </div>
    </div>
    <div class='btn-container'>
      <k-button
        v-show='editAdmin'
        class='add-new-admin-btn'
        variant='link'
        @click='showAddAdminmodal = true'
      >
        Add new admin
      </k-button>
      <k-button @click="toggleButtonText" variant="tertiary">{{ button.text }}</k-button>
    </div>
    <k-modal v-if="showEditModal" :open="showEditModal">
      <k-edit-admin @close="showEditModal = false" :currentadmin="currentAdmin"></k-edit-admin>
    </k-modal>
    <k-modal v-if="showAddAdminmodal" :open="showAddAdminmodal">
      <k-add-admin @close="showAddAdminmodal = false"></k-add-admin>
    </k-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import stringHelpers from '@/utils/string-helpers';
import { KButton, KIcons, KModal } from '@/components';
import KEditAdmin from './EditAdmin.vue';
import KAddAdmin from './AddAdmin.vue';

export default {
  name: 'KAdmins',
  components: {
    KIcons,
    KButton,
    KEditAdmin,
    KModal,
    KAddAdmin,
  },
  data: () => ({
    editAdmin: false,
    showEditModal: false,
    showAddAdminmodal: false,
    currentAdmin: {},
    button: {
      text: 'Edit Admin',
    },
    show: false,
  }),
  computed: {
    ...mapGetters({
      admins: 'admin/getAll',
      roles: 'roles/getAll',
      user: 'auth/getUser',
    }),
  },
  methods: {
    ...stringHelpers,
    ...mapActions({
      deleteAdmin: 'admin/deleteOtherAdmin',
    }),
    toggleButtonText() {
      this.editAdmin = !this.editAdmin;
      this.button.text = this.editAdmin ? 'Save Changes' : 'Edit Admin';
    },
    handleEditAdmin(id) {
      try {
        this.showEditModal = true;
        const currentAdmin = this.admins.find((a) => a.id === id);
        const roleId = this.roles.find((r) => r.name === currentAdmin.roleName).id;
        this.currentAdmin = { ...currentAdmin, roleId };
      } catch (e) {
        this.$toast.show({ message: e });
      }
      return this.currentAdmin;
    },
    async handleDeleteAdmin(id) {
      const { token } = this.user;
      try {
        const response = await this.deleteAdmin({ token, id });
        this.$toast.show({ message: response });
      } catch (e) {
        this.$toast.show({ message: e });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.admins {
  position: relative;

  .admin__item {
    display: grid;
    grid-template-columns: max-content max-content max-content;
    grid-column-gap: 2.4rem;
    max-width: 34rem;
    margin-bottom: 2.4rem;
    transition: grid-template-columns 2s ease;

    .avatar-icon {
      width: 4rem;
      height: 4rem;
    }

    .admin-text {
      white-space: nowrap;

      .name {
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 1.6rem;
        color: $black;
      }

      .role {
        @extend .name;
        font-weight: 400;
        margin-top: 0.6rem;
      }
    }
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
