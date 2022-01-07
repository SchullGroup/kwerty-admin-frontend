<template>
  <div class='settings__content'>
    <h1>Roles & Permissions</h1>
    <div class='settings__section settings__section--with-line'>
      <editable-list-item
        v-for='role in roles'
        :key='role.id'
        :item='role'
        :no-delete='role.noDelete'
        :no-edit='role.noEdit'
        :show-controls='editing'
        :styling="{ marginBottom: '3.2rem' }"
        @delete='deleteItem(role.id)'
        @edit='editItem'
      >
        <div class='role'>
          <h3 class='role__title'>
            {{ snakeToTitle(role.name) }}
          </h3>
          <div class='role__description'>{{ role.description }}</div>
        </div>
      </editable-list-item>
      <div class='controls'>
        <template>
          <k-button v-if='!editing' variant='tertiary'>Download CSV</k-button>
          <k-button v-if='!editing' variant='secondary' @click='editing = true'>Edit Roles
          </k-button>
        </template>
        <template>
          <k-button v-if='editing' variant='link' @click='addItem'>Add New Role</k-button>
          <k-button v-if='editing' variant='tertiary' @click='editing = false'>
            Save Changes
          </k-button>
        </template>
      </div>
      <!--      </k-card>-->
      <k-modal :open='modalOpen' @close='modalOpen = false'>
        <role-form :edit='role' @close='modalOpen = false' />
      </k-modal>
    </div>
  </div>
</template>

<script>
import KRoles from './Roles';

export default KRoles;
</script>

<style lang='scss' scoped src='./Roles.scss'></style>
