<template>
  <k-card :heading="edit ? 'Edit Role' : 'Add Role'" variant='in-modal'>
    <form ref='form' class='form__items' @submit.prevent='handleSubmit'>
      <k-input v-model='formValue.name' label='Title' name='title'></k-input>
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
        <k-button :loading='isLoading' variant='secondary' submit>
          Finish
        </k-button>
      </div>
    </form>
  </k-card>
</template>

<script>
import { mapActions } from 'vuex';
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
    isLoading: false,
    id: null,
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
    ...mapActions({
      addRole: 'roles/addRole',
      editRole: 'roles/editRole',
    }),
    dataFromProps(edit) {
      const {
        id, name, description, permissions,
      } = edit;
      this.formValue = { name, description };
      const rolePerm = JSON.parse(permissions);
      Object.keys(this.permissions).forEach((category) => {
        this.permissions[category] = rolePerm[category];
      });
      this.id = id;
    },
    permissionToLabel(permission, label) {
      const getLabel = (cat) => {
        if (cat === 'admin') return 'administrators';
        if (cat === 'dataset') return 'data';
        return cat;
      };
      const permissionLabel = `${this.capitalize(this.snakeCase(permission))} ${getLabel(label)}`;
      return { value: permission, label: permissionLabel };
    },
    async handleSubmit() {
      this.isLoading = true;
      try {
        const { formValue, permissions, id } = this;
        if (this.edit) {
          const message = await this.editRole({
            role: {
              ...formValue,
              permissions,
            },
            id,
          });
          if (message.error) throw Error(message.error);
          this.$toast.show({ message });
          this.$emit('close');
        } else {
          const message = await this.addRole({
            role: {
              ...formValue,
              permissions,
            },
          });
          if (message.error) throw Error(message.error);
          this.$toast.show({ message });
          this.$emit('close');
        }
      } catch (e) {
        this.$toast.show({ message: e });
      } finally {
        this.isLoading = false;
      }
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
      return Object.entries(allPermissions).reduce((prepared, [category, permissions]) => {
        const permissionLabels = permissions.map((p) => this.permissionToLabel(p, category));
        return {
          ...prepared,
          [category]: permissionLabels,
        };
      }, {});
    },
  },
  props: {
    edit: {
      type: Object,
    },
  },
  mounted() {
    if (this.edit) {
      this.oldTitle = this.edit.name;
      this.dataFromProps(this.edit);
    } else {
      this.formValue = { name: '', description: '' };
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
