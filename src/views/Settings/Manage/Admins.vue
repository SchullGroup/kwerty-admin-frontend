<template>
  <div class='admins'>
    <template v-if='loading'>
      <div v-for='i in Array(10).keys()' :key='i' class='admin__item'>
        <k-icons
          v-show='editAdmin'
          :class="['icons']"
        />
        <div class='avatar-icon'>
          <div class='suspense'></div>
        </div>
        <div class='admin-text'>
          <div class='name'>
            <div class='suspense fixed-height w-70'></div>
          </div>
          <div class='role'>
            <div class='suspense fixed-height w-50'></div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
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
    </template>
    <div class='btn-container'>
      <k-button
        v-show='editAdmin'
        class='add-new-admin-btn'
        variant='link'
        @click='showAddAdminmodal = true'
      >
        Add new admin
      </k-button>
      <k-button v-if='!editAdmin' variant='tertiary' @click='download'>Download CSV
      </k-button>
      <k-button :variant='!editAdmin ? "secondary" : "tertiary"' @click='toggleButtonText'>
        {{ button.text }}
      </k-button>
    </div>
    <k-modal :open='showEditModal' @close='showEditModal = false'>
      <k-edit-admin :currentadmin='currentAdmin' @close='showEditModal = false'></k-edit-admin>
    </k-modal>
    <k-modal :open='showAddAdminmodal' @close='showEditModal = false'>
      <k-add-admin @close='showAddAdminmodal = false'></k-add-admin>
    </k-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { saveAs } from 'file-saver';
import stringHelpers from '@/utils/string-helpers';
import { exportAdmins } from '@/api';
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
  props: {
    loading: {
      type: Boolean,
    },
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
    async download() {
      try {
        const data = await (exportAdmins());
        if (data.error) throw Error(data.error);
        const blob = new Blob([data.data], { type: 'text/plain;charset=UTF-8' });
        saveAs(blob, 'Kwerty Administrators.csv');
      } catch (e) {
        this.$toast.show({ message: e.message });
      }
    },
    handleEditAdmin(id) {
      try {
        this.showEditModal = true;
        const currentAdmin = this.admins.find((a) => a.id === id);
        const roleId = this.roles.find((r) => r.name === currentAdmin.roleName).id;
        this.currentAdmin = { ...currentAdmin, roleId };
      } catch (e) {
        this.$toast.show({ message: e.message });
      }
      return this.currentAdmin;
    },
    async handleDeleteAdmin(id) {
      try {
        const response = await this.deleteAdmin({ id });
        if (response.error) throw Error(response.error);
        this.$toast.show({ message: response });
      } catch (e) {
        this.$toast.show({ message: e.message });
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
      border-radius: 50%;
      overflow: hidden;
    }

    .admin-text {
      white-space: nowrap;
      width: 100%;
      min-width: 36rem;

      .name {
        width: 100%;
        height: 1.6rem;
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
    display: grid;
    justify-content: flex-end;
    align-items: center;
    grid: 1fr / auto-flow max-content;
    column-gap: 1.6rem;
  }
}
</style>
