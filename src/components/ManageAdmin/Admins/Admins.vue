<template>
  <k-card heading="Manage Admins">
    <div v-for="admin in admins" :key="admin.name" class="admin__item">
      <k-icons v-show="editAdmin" :class="[editAdmin ? 'showIcons' : '']" />
      <img src="@/assets/avatar.png" alt="avatar" class="avatar-icon" />
      <div class="admin-text">
        <p class="name">{{ admin.name }}</p>
        <p class="role">{{ admin.role }}</p>
      </div>
    </div>
    <div class="btn-container">
      <k-button v-show="editAdmin" variant="link" class="add-new-admin-btn">Add new admin</k-button>
      <k-button @click="toggleButtonText" variant="tertiary">{{ button.text }}</k-button>
    </div>
  </k-card>
</template>

<script src="./Admins.js">
</script>

<style lang="scss" src="./Admins.scss"></style>
