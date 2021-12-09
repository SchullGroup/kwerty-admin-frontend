<template>
  <div class="settings__content">
    <div class="manage">
      <h1>Manage Admins</h1>
      <k-pagination
        :page="page"
        :maxItemsOnPage="itemsOnPage"
        :totalPages='pagination.totalPages'
        :totalItems="pagination.total"
        @goToNext="nextPage"
        @goToPrev="prevPage"
      ></k-pagination>
    </div>
    <div class="settings__section settings__section--with-line">
      <k-admins></k-admins>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { KPagination } from '@/components';
import KAdmins from './Admins.vue';

export default {
  name: 'ManageAdminsSettings',
  components: {
    KAdmins,
    KPagination,
  },
  data: () => ({
    itemsOnPage: 10,
    modalOpen: true,
    page: 1,
  }),
  mounted() {
    this.page = this.pagination.currentPage;
  },
  computed: {
    ...mapGetters({
      pagination: 'admin/getPagination',
      user: 'auth/getUser',
    }),
  },
  methods: {
    ...mapActions({
      fetchAdmins: 'admin/fetchAll',
    }),
    prevPage() {
      this.page -= 1;
    },
    nextPage() {
      this.page += 1;
    },
  },
  watch: {
    page(num) {
      const { token } = this.user;
      try {
        this.fetchAdmins({ token, page: num });
      } catch (e) {
        this.$toast.show({ message: e });
      }
    },
  },
};
</script>

<style lang="scss" src="../Settings.scss" scoped></style>
