<template>
  <div class="wrapper">
    <button
      :disabled="!isToggled"
      @click="toggle"
      :class="['toggle__off', [isToggled ? 'toggle__off-active' : '']]"
    >
      OFF
    </button>
    <button
      :disabled="isToggled"
      @click="toggle"
      :class="['toggle__on', [isToggled ? 'toggle__on-active' : '']]"
    >
      ON
    </button>
  </div>
</template>

<script>
import KToggle from './Toggle';

export default KToggle;
</script>

<style lang="scss" src="./Toggle.scss" scoped></style>
