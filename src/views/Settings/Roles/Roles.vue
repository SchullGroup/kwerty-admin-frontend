<template>
  <div class="settings__content">
    <h1>Roles & Permissions</h1>
    <div class="settings__section settings__section--with-line">
      <editable-list-item
        :show-controls="editing"
        v-for="role in roles"
        :key="role.id"
        :styling="{ marginBottom: '3.2rem' }"
        :no-delete="role.noDelete"
        :no-edit="role.noEdit"
        :item="role"
        @edit="editItem"
        @delete="deleteItem(role.id)"
      >
        <div class="role">
          <h3 class="role__title">
            {{ snakeToTitle(role.name) }}
          </h3>
          <div class="role__description">{{ role.description }}</div>
        </div>
      </editable-list-item>
      <div class="controls">
        <k-button variant="tertiary" @click="editing = true" v-if="!editing">Edit Roles</k-button>
        <template>
          <k-button variant="link" v-if="editing" @click="addItem">Add New Role</k-button>
          <k-button variant="tertiary" @click="editing = false" v-if="editing">
            Save Changes
          </k-button>
        </template>
      </div>
      <!--      </k-card>-->
      <k-modal :open="modalOpen" @close="modalOpen = false">
        <role-form :edit="role" @close="modalOpen = false" />
      </k-modal>
    </div>
  </div>
</template>

<script>
import KRoles from './Roles';

export default KRoles;
</script>

<style lang="scss" src="./Roles.scss" scoped></style>
