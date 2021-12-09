<template>
  <div class="admins">
    <div v-for="admin in admins" :key="admin.email" :class="['admin__item']">
      <k-icons
        @edit="handleEditAdmin(admin)"
        @delete="showAddAdminmodal = true"
        v-show="editAdmin"
        :class="['icons']"
      />
      <img src="@/assets/avatar.png" alt="avatar" class="avatar-icon" />
      <div class="admin-text">
        <p class="name">{{ admin.firstName }} {{ admin.lastName }}</p>
        <p class="role">{{ admin.role }}</p>
      </div>
    </div>
    <div class="btn-container">
      <k-button
        @click="showAddAdminmodal = true"
        v-show="editAdmin"
        variant="link"
        class="add-new-admin-btn"
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
import { KIcons, KButton, KModal } from '@/components';
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
  props: {},
  data: () => ({
    editAdmin: false,
    showEditModal: false,
    showAddAdminmodal: false,
    currentAdmin: {},
    button: {
      text: 'Edit Admin',
    },
    show: false,
    admins: [
      {
        firstName: 'Akomolafe',
        lastName: 'Olamide',
        role: 'Admin',
        email: 'AO@gmail.com',
      },
      {
        firstName: 'Sonny',
        lastName: 'Kyel',
        role: 'Guest',
        email: 'SK@gmail.com',
      },
      {
        firstName: 'Nnenna',
        lastName: 'Ojiofor',
        role: 'Guest',
        email: 'NO@gmail.com',
      },
      {
        firstName: 'Oluwaseun',
        lastName: 'Morenike',
        role: 'Admin',
        email: 'OM@gmail.com',
      },
    ],
  }),
  methods: {
    toggleButtonText() {
      this.editAdmin = !this.editAdmin;
      this.button.text = this.editAdmin ? 'Save Changes' : 'Edit Admin';
    },
    handleEditAdmin(item) {
      if (item) {
        this.showEditModal = true;
        this.currentAdmin = item;
      }
      return this.currentAdmin;
    },
  },
};
</script>

<style lang="scss" scoped>
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
