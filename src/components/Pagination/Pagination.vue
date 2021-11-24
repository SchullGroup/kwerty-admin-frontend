<template>
  <div class="pagination">
    <button class="pagination__button" @click="prevPage">
      <img :src="iconBack" alt="" class="pagination__button__icon" />
    </button>
    <span class="pagination__info">
      {{ currentPageStart }}-{{ currentPageEnd }} out of {{ totalItems }}
    </span>
    <button class="pagination__button" @click="nextPage">
      <img :src="iconNext" alt="" class="pagination__button__icon" />
    </button>
  </div>
</template>

<script>
import KPagination from './Pagination';

export default KPagination;
</script>

<style src="./Pagination.scss" lang="scss" scoped></style>
