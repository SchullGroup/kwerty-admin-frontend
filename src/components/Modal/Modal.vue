<template>
  <transition name="fade">
    <div
      :class="['modal', [uploading === 'true' ? 'uploading-state' : '']]"
      v-if="isOpen"
      @click.stop="closeModal"
    >
      <div :class="['modal__content', { isOpen: isOpen }]">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import KModal from './Modal';

export default KModal;
</script>

<style lang="scss" src="./Modal.scss" scoped></style>
