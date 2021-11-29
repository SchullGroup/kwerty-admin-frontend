<template>
  <k-card variant="['rounded']" heading="Edit Admin">
    <form class="form__items">
      <k-input label="Surname" />
      <k-input label="First Name" />
      <k-input label="Email Address" type="email" />
      <k-input label="Password" variant="password" />
      <k-input label="Set Role" type="select">
        <option value="Admin" class="option">Admin</option>
        <option value="Auditor" class="option">Auditor</option>
        <option value="Manager" class="option">Manager</option>
      </k-input>
      <div class="btn-wrapper">
        <k-button variant="link">Cancel</k-button>
        <k-button variant="secondary">Finish</k-button>
      </div>
    </form>
  </k-card>
</template>

<script src="./EditAdmin.js">
</script>

<style lang="scss" src="./EditAdmin.scss"></style>
