<template>
  <div class="settings__content">
    <div class="manage">
      <h1>Manage Admins</h1>
      <k-pagination
        :page="page"
        :maxItemsOnPage="4"
        :totalItems="totalItems"
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
import { KPagination } from '@/components';
import KAdmins from './Admins.vue';

export default {
  name: 'ManageAdminsSettings',
  components: {
    KAdmins,
    KPagination,
  },
  data: () => ({
    page: 1,
    totalItems: 4,
    itemsOnPage: 20,
    modalOpen: true,
  }),
};
</script>

<style lang="scss" src="../Settings.scss" scoped></style>
