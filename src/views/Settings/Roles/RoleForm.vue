<template>
  <k-card :heading="edit ? 'Edit Role' : 'Add Role'" variant='in-modal'>
    <form ref='form' class='form__items'>
      <k-input v-model='formValue.title' label='Title' name='title'></k-input>
      <k-input v-model='formValue.description' label='Description' name='description'></k-input>
      <div class='permissions'>
        <div
          v-for='[category, activePermissions] in Object.entries(permissionLabels)'
          :key='category'
          class='permissions__group'
        >
          <p class='permissions__group__name'>{{ category }}</p>
          <div v-for='{value, label} in activePermissions' :key='label' class='check'>
            <k-checkbox
              v-model='permissions[category]'
              :label='label'
              :name='label.replaceAll(" ")'
              :value='value'
            ></k-checkbox>
          </div>
        </div>
      </div>
      <div class='controls'>
        <k-button type='button' variant='link' @click="$emit('close')">Cancel</k-button>
        <k-button type='button' variant='secondary' @click="$emit('close')"> Finish</k-button>
      </div>
    </form>
  </k-card>
</template>

<script>
import {
  KButton, KCard, KCheckbox, KInput,
} from '@/components';
import stringHelpers from '@/utils/string-helpers';

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
    permissions: {
      dataset: [],
      indicator: [],
      role: [],
      admin: [],
      activity: [],
    },
  }),
  methods: {
    ...stringHelpers,
    permissionToLabel(permission, label) {
      const getLabel = (cat) => {
        if (cat === 'admin') return 'administrators';
        if (cat === 'dataset') return 'data';
        return cat;
      };
      const permissionLabel = `${this.capitalize(this.snakeCase(permission))} ${getLabel(label)}`;
      return { value: permission, label: permissionLabel };
    },
  },
  computed: {
    permissionLabels() {
      const allPermissions = {
        dataset: ['create', 'update', 'delete', 'publish', 'view', 'unpublish', 'soft_delete'],
        indicator: ['create', 'update', 'delete', 'view'],
        role: ['create', 'update', 'delete', 'view'],
        admin: ['create', 'update', 'delete', 'view'],
        activity: ['view_user', 'view_admin'],
      };
      const res = Object.entries(allPermissions).reduce((prepared, [category, permissions]) => {
        const permissionLabels = permissions.map((p) => this.permissionToLabel(p, category));
        return {
          ...prepared,
          [category]: permissionLabels,
        };
      }, {});

      return res;
    },
  },
  watch: {
    permissions(val) {
      console.log(val);
    },
  },
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

<style lang='scss' scoped>
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
