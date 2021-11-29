<template>
  <k-dashboard-layout>
    <div class="settings">
      <aside class="settings__sidebar">
        <h1>Settings</h1>
        <ul class="settings__menu">
          <li
            @click="activeTab = 'profile'"
            :class="[
            'settings__menu__item',
            { active: activeTab === 'profile'}
            ]">
            Profile
          </li>
          <li
            @click="activeTab = 'roles'"
            :class="[
            'settings__menu__item',
            { active: activeTab === 'roles'}
            ]">
            Roles & Permissions
          </li>
          <li
            @click="activeTab = 'manage'"
            :class="[
            'settings__menu__item',
            { active: activeTab === 'manage'}
            ]">
            Manage Admins
          </li>
        </ul>
      </aside>
      <k-profile v-if="activeTab === 'profile'" />
      <k-manage v-if="activeTab === 'manage'" />
    </div>
  </k-dashboard-layout>
</template>
<script>
import KSettings from './Settings';

export default KSettings;
</script>

<style lang="scss" scoped src="./Settings.scss"></style>
