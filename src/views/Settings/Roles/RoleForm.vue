<template>
  <k-card :heading="edit ? 'Edit Role' : 'Add Role'" variant="in-modal">
    <form ref='form' class="form">
      <k-input label="Title" name='title' v-model="formValue.title"></k-input>
      <k-input label="Description" name='description' v-model="formValue.description"></k-input>
    </form>
    <div class='controls'>
      <k-button type='button' variant='link' @click="$emit('close')">Cancel</k-button>
      <k-button type='button'
                variant='secondary'
                @click="$emit('close')">
        Finish
      </k-button>
    </div>
  </k-card>
</template>

<script>
import KCard from '../../../components/Card/Card';
import KInput from '../../../components/Input/Input';
import KButton from '../../../components/Button/Button';

export default {
  name: 'RoleForm',
  components: { KButton, KInput, KCard },
  data: () => ({
    formValue: { },
    oldTitle: '',
  }),
  props: {
    edit: {
      type: Object,
    },
  },
  mounted() {
    this.oldTitle = this.edit.title;
    this.formValue = { ...this.edit };
  },
  beforeUpdate() {
    this.oldTitle = this.edit.title;
    this.formValue = { ...this.edit };
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  grid: auto-flow max-content / 1fr;
  row-gap: 2.4rem;
  margin-bottom: 3.2rem;
}
.controls {
  display: grid;
  grid: 1fr / auto-flow max-content;
  justify-content: end;
  column-gap: 1.6rem;
}
</style>
