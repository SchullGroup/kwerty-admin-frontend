<template>
  <div class="admins">
    <div
      v-for="admin in admins"
      :key="admin.name"
      :class="['admin__item', [editAdmin ? 'showIcons' : '']]"
    >
      <k-icons
        @open="showEditAdminModal = true"
        v-show="editAdmin"
        :class="[editAdmin ? 'showIcons' : '']"
      />
      <img src="@/assets/avatar.png" alt="avatar" class="avatar-icon" />
      <div class="admin-text">
        <p class="name">{{ admin.name }}</p>
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
    <k-modal v-if="showEditAdminModal" :open="showEditAdminModal">
      <k-edit-admin @close="showEditAdminModal = false"></k-edit-admin>
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
    showEditAdminModal: false,
    showAddAdminmodal: false,
    button: {
      text: 'Edit Admin',
    },
    show: false,
    admins: [
      {
        name: 'Akomolafe Olamide',
        role: 'Admin',
      },
      {
        name: 'Sonny Kyel',
        role: 'Guest',
      },
      {
        name: 'Nnenna Ojiofor',
        role: 'Guest',
      },
      {
        name: 'Oluwaseun Morenike',
        role: 'Admin',
      },
    ],
  }),
  methods: {
    toggleButtonText() {
      this.editAdmin = !this.editAdmin;
      this.button.text = this.editAdmin ? 'Save Changes' : 'Edit Admin';
    },
  },
};
</script>

<style lang="scss" scoped>
.admins {
  position: relative;
  .admin__item {
    display: grid;
    grid-template-columns: 0fr 1fr 3fr;
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
  .showIcons {
    grid-template-columns: 1fr 1fr 3fr;
  }

  // .showIcons {
  //   transform: translateX(-30%);
  //   -webkit-transform: translateX(-30%);
  //   animation: slide-in 2s forwards;
  // }
  // @keyframes slide-in {
  //   100% {
  //     transform: translateX(0%);
  //   }
  // }
}
</style>
