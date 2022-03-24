<template>
  <div :class="['pagination',[ forTable ? 'pagination__table' : '']]">
    <button v-if="variant === 'many'" :class="['pagination__button', {'disabled': page === 1}]"
            @click='page === 1 ? null : firstPage()'>
      <img :src='iconFirstPage' alt='' class='pagination__button__icon' />
    </button>
    <button :class="['pagination__button', {'disabled': page === 1}]"
            @click='page === 1 ? null : prevPage()'>
      <img :src='iconBack' alt='' class='pagination__button__icon' />
    </button>
    <span class='pagination__info'>
      {{ currentPageStart }}-{{ currentPageEnd }} out of {{ totalItems }}
    </span>
    <button :class="['pagination__button', {'disabled': page === totalPages || !totalPages}]"
            @click='page === totalPages ? null : nextPage() '>
      <img :src='iconNext' alt='' class='pagination__button__icon' />
    </button>
    <button v-if="variant === 'many'"
            :class="['pagination__button', {'disabled': page === totalPages || !totalPages}]"
            @click='page === totalPages ? null : lastPage()'>
      <img :src='iconLastPage' alt='' class='pagination__button__icon' />
    </button>
  </div>
</template>

<script>
import KPagination from './Pagination';

export default KPagination;
</script>

<style lang='scss' scoped src='./Pagination.scss'></style>
