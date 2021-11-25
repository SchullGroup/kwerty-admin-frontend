<template>
  <main class="dashboard">
    <div class="dashboard__header">
      <img src="@/assets/logo.png" :alt="appName" class="logo">
      <nav class="navbar">
        <ul class="navbar__list">
          <template v-for="item in menuItems">
            <li class="navbar__item" :key="item.name">
              <router-link  v-if="item.route" :to="item.route">
                {{item.label}}
              </router-link>
              <a href="#" v-else>
                {{item.label}}
                <ul class="navbar__dropdown">
                  <template v-for="childRoute in item.children">
                    <li class="navbar__dropdown__item" :key="childRoute.name">
                      <router-link :href="href"  :to="childRoute.route">
                        {{childRoute.label}}
                      </router-link>
                    </li>
                  </template>
                </ul>
              </a>
          </li>
        </template>
        </ul>
      </nav>
      <div class="user">
        <div class="user__avatar">
          <img src="@/assets/avatar.png" :alt="user.firstName">
        </div>
        <div class="user__details">
          <p class="text-bold">{{ user.firstName }} {{ user.lastName }}</p>
          <p>{{ user.role }}</p>
        </div>
      </div>
    </div>
    <div class="dashboard__content">
      <slot />
    </div>
  </main>
</template>
<script>
import KDashboardLayout from './DashboardLayout';

export default KDashboardLayout;
</script>
<style lang="scss" src="./DashboardLayout.scss" scoped></style>
