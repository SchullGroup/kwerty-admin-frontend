<template>
  <k-dashboard-layout>
    <header :class="['header', { selected: selected }]">
      <h1>Database</h1>
      <transition name="header-fade" mode="out-in">
        <!-- DEFAULT HEADER CONTROLS -->
        <div class="header__controls" v-if="!selected">
          <div class="search">
            <k-input label="Search by country, indicators or categories"></k-input>
          </div>
          <div class="filter">
            <k-input
              type="select"
              label="Filter by Category"
              variant="dropdown"
              v-model="category"
              :optionsDisplay="categories"
            ></k-input>
          </div>
          <div class="filter">
            <k-input
              type="select"
              label="Filter by Indicator"
              variant="dropdown"
              v-model="indicator"
              :optionsDisplay="indicators"
            ></k-input>
          </div>
          <div class="filter">
            <k-input
              type="select"
              label="Filter by Country"
              variant="dropdown"
              v-model="country"
              :optionsDisplay="countries"
            ></k-input>
          </div>
          <div class="button">
            <k-button variant="primary">Upload New Data</k-button>
          </div>
        </div>

        <!--  HEADER CONTROLS WHEN ROWS SELECTED -->
        <div class="header__controls__selected" v-if="selected">
          <div class="selected-count">{{ selected }} selected</div>

          <!-- BUTTONS WHEN NON DELETED DATA IS SELECTED -->
          <div class="header__controls" v-if="activeTab !== 'deleted'">
            <k-button
              variant="secondary"
              :disabled="activeTab !== 'drafts'"
              @click="confirmAction('publish')"
            >
              Publish All
            </k-button>
            <k-button
              variant="secondary"
              @click="confirmAction('unpublish')"
              :disabled="activeTab === 'drafts'"
            >
              Unpublish All
            </k-button>
            <k-button variant="secondary" negative="negative" @click="confirmAction('delete')">
              Delete
            </k-button>
          </div>

          <!-- BUTTONS WHEN DELETED DATA IS SELECTED -->
          <div class="header__controls" v-else>
            <k-button variant="primary" @click="confirmAction('restore')"
              >Restore to Drafts</k-button
            >
            <k-button
              variant="secondary"
              negative="negative"
              @click="confirmAction('clear your bin')"
            >
              Permanently Delete
            </k-button>
          </div>
        </div>
      </transition>
    </header>
    <section class="content">
      <!-- SIDEBAR -->
      <aside class="content__sidebar">
        <ul class="database__menu">
          <li
            :class="['database__menu__item', { active: activeTab === 'all' }]"
            @click="activeTab = 'all'"
          >
            All Data
          </li>
          <li
            :class="['database__menu__item', { active: activeTab === 'published' }]"
            @click="activeTab = 'published'"
          >
            Published
          </li>
          <li
            :class="['database__menu__item', { active: activeTab === 'drafts' }]"
            @click="activeTab = 'drafts'"
          >
            Drafts
          </li>
          <li
            :class="['database__menu__item', { active: activeTab === 'deleted' }]"
            @click="activeTab = 'deleted'"
          >
            Deleted
          </li>
        </ul>
      </aside>

      <!-- DATA TABLE     -->
      <section class="database__data">
        <transition name="slide-down">
          <div class="delete__alert" v-if="activeTab === 'deleted'">
            All data found here will be permanently deleted after 30 days
          </div>
        </transition>
        <k-table
          :fields="tableFields"
          :fields-display="tableFieldsDisplay"
          :datalist="allTableData"
          v-model="selectedRows"
        ></k-table>
      </section>
    </section>

    <!-- MODAL   -->
    <k-modal v-if="modalOpen" :open="modalOpen" @close="closeModal">
      <k-card
        :heading="`Are you sure you want to ${activeModal}?`"
        variant="in-modal"
        :wrap-heading="true"
        :longer-heading="activeModal === 'clear your bin'"
      >
        <div class="modal__content">
          <!-- confirm publish message -->
          <template v-if="activeModal === 'publish'">
            <p>
              Publishing makes this data available to the public for viewing. Ensure that every data
              set is accurate before clicking to continue.
            </p>
            <p>
              You can choose to unpublish this data again if you discover any errors. It will be
              removed immediately from the platform.
            </p>
          </template>

          <!-- confirm upbublish message -->
          <template v-if="activeModal === 'unpublish'">
            <p>
              Unpublishing happens instantly and your data would no longer be accessible by users on
              the platform.
            </p>
            <p>
              If this data is published again, it will immediately become available to users who
              have saved it to their profile.
            </p>
          </template>

          <!-- confirm delete message -->
          <template v-if="activeModal === 'delete'">
            <p>
              You can still access this data within 30 days of deletion. After 30 days, this data is
              automatically deleted, permanently.
            </p>
          </template>

          <!-- confirm restore message -->
          <template v-if="activeModal === 'restore'">
            <p>
              When you restore this data, you can find it underneath your drafts folder for further
              edits or review.
            </p>
          </template>

          <!-- confirm permanently delete message -->
          <template v-if="activeModal === 'clear your bin'">
            <p>
              Once you do this, the data is wiped completely from here. You will no longer have
              access to it.
            </p>
          </template>
          <br />
          <p>
            Type <span class="important">{{ requiredMessage }}</span> to confirm this action
          </p>
          <k-input label="Your input" v-model="entered" :reactive="true"></k-input>
          <div class="modal-controls">
            <k-button variant="link" @click="closeModal">Cancel</k-button>
            <k-button variant="primary" @click="closeModal" :disabled="!isSame">Unpublish</k-button>
          </div>
        </div>
      </k-card>
    </k-modal>

    <!-- PAGINATION -->
    <k-pagination
      :forTable="true"
      variant="many"
      :page="1"
      :maxItemsOnPage="20"
      :totalItems="20"
    ></k-pagination>
  </k-dashboard-layout>
</template>

<script>
import ManageData from './Manage';

export default ManageData;
</script>

<style lang="scss" src="./Manage.scss" scoped></style>
