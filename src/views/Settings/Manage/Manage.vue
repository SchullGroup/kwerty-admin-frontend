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
        @goToFirst="firstPage"
        @goToLast="lastPage"
      ></k-pagination>
    </div>
    <div class="settings__section settings__section--with-line">
      <k-admins :loading='isLoading'></k-admins>
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
    isLoading: false,
    page: 1,
  }),
  mounted() {
    if (!this.pagination) return;
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
    firstPage() {
      this.page = 1;
    },
    lastPage() {
      this.page = this.pagination.totalPages;
    },
  },
  watch: {
    async page(num) {
      this.isLoading = true;
      try {
        await this.fetchAdmins({ page: num });
      } catch (e) {
        this.$toast.show({ message: e });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" src="../Settings.scss" scoped></style>
