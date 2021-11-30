<template>
  <div :class="['item', {'showing-controls': showControls}]" :style='styling'>
    <div class="item__controls">
      <div class="delete">
        <img :src="deleteIcon" alt="" v-if='!noDelete' @click='deleteItem'/>
      </div>
      <div class="edit">
        <img :src="editIcon" alt="" v-if='!noEdit' @click='editItem'/>
      </div>
    </div>
    <div class="item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import deleteIcon from '@/assets/deleteIcon.svg';
import editIcon from '@/assets/editIcon.svg';

export default {
  name: 'EditableListItem',
  props: ['noDelete', 'noEdit', 'showControls', 'styling', 'item'],
  data: () => ({
    deleteIcon,
    editIcon,
  }),
  methods: {
    editItem() {
      this.$emit('edit', this.item);
    },
    deleteItem() {
      this.$emit('delete', this.item);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: grid;
  grid: 1fr / 0 auto;
  transition: grid-template-columns 300ms ease-out;
  align-items: center;
  &.showing-controls {
    grid: 1fr / 8rem auto;
    .item__controls {
      grid: 1fr / 1fr 1fr;
      & > * {opacity: 1};
    }
  }
  &__controls {
    display: grid;
    grid: 1fr / 0 0;
    transition: grid-template-columns 150ms ease-out;
    & > * {
      overflow-x: hidden;
      opacity: 0;
      transition: opacity 150ms ease-out;
    }
    img {
      padding: 0.4rem;
      cursor: pointer;
      border-radius: 0.4rem;
      &:hover {
        background: rgba($grey-light, .4);
      }
      &:active {
        background: rgba($grey-light, 1);
      }
    }
  }
}
</style>
