<template>
  <div class="admins">
    <div v-for="admin in admins" :key="admin.name" class="admin__item">
      <k-icons
        @open="editAdmin = false"
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
      <k-button v-show="editAdmin" variant="link" class="add-new-admin-btn">Add new admin</k-button>
      <k-button @click="toggleButtonText" variant="tertiary">{{ button.text }}</k-button>
    </div>
  </div>
</template>

<script>
import { KIcons, KButton } from '@/components';

export default {
  name: 'KAdmins',
  components: {
    KIcons,
    KButton,
  },
  props: {},
  data: () => ({
    editAdmin: false,
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
    grid-template-columns: 0.5fr 0.5fr 3fr;
    grid-column-gap: 2.4rem;
    max-width: 34rem;
    margin-bottom: 2.4rem;
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
