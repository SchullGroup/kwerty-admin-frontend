<template>
  <k-dashboard-layout>
    <header :class="['header', 'selected']">
      <h1>Database</h1>
      <template v-if="!isSingleView">
        <!-- DEFAULT HEADER CONTROLS -->
        <div class="header__controls with-search header__controls-flex" v-if="!selected">
          <div class="search">
            <k-input
              label="Search by country, indicators or categories"
              v-model="search"
              reactive
            ></k-input>
          </div>
          <div class="filter">
            <k-input
              type="select"
              label="Filter by Category"
              variant="dropdown"
              v-model="category"
              :optionsDisplay="categories"
              searchInside="categories"
            ></k-input>
          </div>
          <div class="filter">
            <k-input
              type="select"
              label="Filter by Indicator"
              v-model="indicator"
              :optionsDisplay="indicators"
              searchInside="indicators"
              @search="(val) => fetchIndicators({ name: val })"
            ></k-input>
          </div>
          <div class="filter">
            <k-input
              type="select"
              label="Filter by Country"
              v-model="country"
              :optionsDisplay="countries"
              searchInside="countries"
            ></k-input>
          </div>
          <div class="button">
            <k-button variant="primary" @click="$router.push({ name: 'Upload' })">
              Upload New Data
            </k-button>
          </div>
        </div>

        <!--  HEADER CONTROLS WHEN ROWS SELECTED -->
        <div class="header__controls__selected" v-if="selected">
          <div class="selected-count">{{ selected }} selected</div>

          <!-- BUTTONS WHEN NON DELETED DATA IS SELECTED -->
          <div class="header__controls" v-if="activeTab !== 'deleted'">
            <k-button
              variant="secondary"
              :disabled="activeTab !== 'draft'"
              @click="confirmAction('publish')"
            >
              Publish All
            </k-button>
            <k-button
              variant="secondary"
              @click="confirmAction('unpublish')"
              :disabled="activeTab === 'draft'"
            >
              Unpublish All
            </k-button>
            <k-button variant="secondary" negative="negative" @click="confirmAction('delete')">
              Delete
            </k-button>
          </div>

          <!-- BUTTONS WHEN DELETED DATA IS SELECTED -->
          <div class="header__controls" v-else>
            <k-button variant="primary" @click="confirmAction('restore')">
              Restore to Drafts
            </k-button>
            <k-button
              variant="secondary"
              negative="negative"
              @click="confirmAction('clear your bin')"
            >
              Permanently Delete
            </k-button>
          </div>
        </div>
      </template>
      <!-- HEADER FOR SINGLE DATA VIEW -->
      <div class="header__controls__selected" v-else>
        <div class="selected-count text-capitalize">
          <button class="back-button" @click="changePage">
            <BackIcon />
          </button>
          {{ singleViewData.country }} - {{ singleViewData.indicatorName }}
        </div>

        <!-- BUTTONS WHEN NON DELETED DATA IS SELECTED -->
        <div class="header__controls">
          <k-button v-if="!isEditing" variant="primary" @click="isEditing = true"> Edit </k-button>
          <k-button v-if="isEditing === true" variant="primary" @click="updateSingleData">
            Save & Continue
          </k-button>
          <k-button
            v-if="!isEditing"
            variant="secondary"
            @click="
              selectedRows.push(singleViewData.id);
              actOnData('publish');recordClicked();
            "
          >
            Publish
          </k-button>
          <k-button
            v-if="!isEditing"
            variant="secondary"
            negative="negative"
            @click="
              selectedRows.push(singleViewData.id);
              confirmAction('delete');
            "
          >
            Delete
          </k-button>
        </div>
      </div>
    </header>
    <section class="content">
      <!-- SIDEBAR -->
      <aside class="content__sidebar">
        <ul class="content__menu">
          <li
            :class="['content__menu__item', { active: activeTab === 'all' }]"
            @click="activeTab = 'all'"
          >
            All Data
          </li>
          <li
            :class="['content__menu__item', { active: activeTab === 'published' }]"
            @click="activeTab = 'published'"
          >
            Published
          </li>
          <li
            :class="['content__menu__item', { active: activeTab === 'draft' }]"
            @click="activeTab = 'draft'"
          >
            Drafts
          </li>
          <li
            :class="['content__menu__item', { active: activeTab === 'deleted' }]"
            @click="activeTab = 'deleted'"
          >
            Deleted
          </li>
        </ul>
      </aside>
      <!-- Single Data view -->
      <SingleData
        v-if="isSingleView"
        :isEditing="isEditing"
        :data="singleViewData"
        :nameOfIndicator="currentNameOfIndicator"
        :dataTags="dataTags"
        @syncSingleData="(val) => (singleViewData = { ...val })"
      />
      <!-- DATA TABLE     -->
      <section class="content__body" v-else>
        <transition name="slide-down">
          <div class="delete__alert" v-if="activeTab === 'deleted'">
            All data found here will be permanently deleted after 30 days
          </div>
        </transition>

        <div v-if="!isFetching && allData.length === 0" class="no-activity text-center">
          <div class="icon">
            <svg width="22" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path :d="svgPath" fill="#666" />
            </svg>
          </div>
          <p>There is currently no data in the database</p>
        </div>
        <k-table
          v-else
          :loading="isFetching"
          :fields="tableFields"
          :fields-display="tableFieldsDisplay"
          :datalist="allData"
          @clickAction="changePage"
          v-model="selectedRows"
        ></k-table>
      </section>
    </section>

    <!-- MODAL   -->
    <k-modal v-if="modalOpen" :open="modalOpen" @close="closeModal">
      <k-card
        :heading="`Are you sure you want to ${activeModal}?`"
        variant="in-modal"
        wrap-heading
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
            <k-button
              variant="primary"
              @click="actOnData('publish')"
              :disabled="!isSame"
              v-if="activeModal === 'publish'"
              :loading="isActing"
              >Publish</k-button
            >
            <k-button
              variant="primary"
              @click="actOnData('unpublish')"
              :disabled="!isSame"
              v-if="activeModal === 'unpublish'"
              :loading="isActing"
              >Unpublish</k-button
            >
            <k-button
              variant="primary"
              @click="actOnData('soft_delete')"
              :disabled="!isSame"
              negative
              v-if="activeModal === 'delete'"
              :loading="isActing"
              >Delete</k-button
            >
            <k-button
              variant="primary"
              @click="actOnData('unpublish')"
              :disabled="!isSame"
              v-if="activeModal === 'restore'"
              :loading="isActing"
              >Restore to Drafts</k-button
            >
            <k-button
              variant="primary"
              @click="actOnData('hard_delete')"
              :disabled="!isSame"
              negative
              v-if="activeModal === 'clear your bin'"
              :loading="isActing"
              >Permanently Delete</k-button
            >
          </div>
        </div>
      </k-card>
    </k-modal>

    <!-- PAGINATION -->
    <k-pagination
      v-if="!isSingleView"
      :forTable="true"
      variant="many"
      :page="paginationData.currentPage"
      :maxItemsOnPage="20"
      :totalItems="paginationData.total"
      :totalPages="paginationData.totalPages"
      @goToNext="currentPage = paginationData.currentPage + 1"
      @goToPrev="currentPage = paginationData.currentPage - 1"
      @goToFirst="currentPage = 1"
      @goToLast="currentPage = Number(paginationData.totalPages)"
    ></k-pagination>
  </k-dashboard-layout>
</template>

<script>
import ManageData from './Manage';

export default ManageData;
</script>

<style lang="scss" src="./Manage.scss" scoped></style>
