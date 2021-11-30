<template>
  <k-card :heading="edit ? 'Edit Role' : 'Add Role'" variant="in-modal">
    <form ref="form" class="form__items">
      <k-input label="Title" name="title" v-model="formValue.title"></k-input>
      <k-input label="Description" name="description" v-model="formValue.description"></k-input>
      <div class="permissions">
        <div
          class="permissions__group"
          v-for="[label, permission] in Object.entries(permissionLabels)"
          :key="permission.join('')"
        >
          <p class="permissions__group__name">{{ label }}</p>
          <div class="check" v-for="check in permission" :key="check">
            <k-checkbox
              :label="check"
              :value="check.split(' ')[0]"
              :name="check.split(' ').join('-')"
              v-model="permissions[label]"
            ></k-checkbox>
          </div>
        </div>
      </div>
      <div class="controls">
        <k-button type="button" variant="link" @click="$emit('close')">Cancel</k-button>
        <k-button type="button" variant="secondary" @click="$emit('close')"> Finish </k-button>
      </div>
    </form>
  </k-card>
</template>

<script>
import {
  KCard, KInput, KButton, KCheckbox,
} from '@/components';

export default {
  name: 'RoleForm',
  components: {
    KButton,
    KInput,
    KCard,
    KCheckbox,
  },
  data: () => ({
    formValue: {},
    oldTitle: '',
    permissionLabels: {
      data: ['View data', 'Edit data', 'Publish data', 'Unpublish data', 'Delete data'],
      roles: ['Add roles', 'Edit roles', 'Delete roles'],
      admins: ['Add administrators', 'Edit administrators', 'Delete administrators'],
      indicators: ['View indicators', 'Add new indicators', 'Edit indicators', 'Delete indicators'],
      'view activity': ['User activity', 'Personal activity', 'Admin activity'],
    },
    permissions: {
      data: [],
      roles: [],
      admins: [],
      indicators: [],
      'view activity': [],
    },
  }),
  props: {
    edit: {
      type: Object,
    },
  },
  mounted() {
    if (this.edit) {
      this.oldTitle = this.edit.title;
      this.formValue = { ...this.edit };
    } else {
      this.formValue = {};
    }
  },
  beforeUpdate() {
    if (this.edit) {
      this.oldTitle = this.edit.title;
      this.formValue = { ...this.edit };
    } else {
      this.formValue = {};
    }
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  grid: auto-flow max-content / 1fr;
  row-gap: 2.4rem;
}
.controls {
  display: grid;
  grid: 1fr / auto-flow max-content;
  justify-content: end;
  column-gap: 1.6rem;
}
.permissions {
  margin: 3.2rem 0 0.8rem;
  display: grid;
  grid: auto-flow max-content / repeat(3, 1fr);
  row-gap: 5.6rem;
  column-gap: 1.6rem;
  &__group {
    display: grid;
    grid: auto-flow max-content / 1fr;
    row-gap: 1.6rem;
    font-size: 1.4rem;
    line-height: 1.6rem;
    &__name {
      text-transform: capitalize;
    }
  }
}
</style>
