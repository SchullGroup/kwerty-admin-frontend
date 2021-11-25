<template>
  <div class="wrapper">
    <input
      type="radio"
      :checked="isChecked"
      :value="value"
      :name="name"
      :id="id"
      class="radio__input"
      @change="$emit('change', $event.target.value)"
    />
    <label :for="id" class="radio__label">{{ label }}</label>
  </div>
</template>

<script>
import KRadio from './Radio';

export default KRadio;
</script>

<style lang="scss" src="./Radio.scss" scoped></style>
