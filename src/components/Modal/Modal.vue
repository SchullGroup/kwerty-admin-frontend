<template>
  <div :class="['modal', { 'isOpen': isOpen }]">
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import KModal from './Modal';

export default KModal;
</script>

<style lang="scss" src="./Modal.scss" scoped></style>
