<template>
  <div class="wrapper">
    <input
      type="checkbox"
      :name="name"
      :value="value"
      :id="name"
      :class="[
        'checkbox__input',
        {
          [`checkbox__input--${fill}`]: fill,
        },
      ]"
    />
    <label :for="name" class="checkbox__label">{{ label }}</label>
  </div>
</template>

<script>
import KCheckbox from './Checkbox';

export default KCheckbox;
</script>

<style lang="scss" src="./Checkbox.scss" scoped></style>
