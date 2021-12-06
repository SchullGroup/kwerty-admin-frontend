<template>
  <k-dashboard-layout>
    <header class="header selected">
      <h1>Database</h1>
      <div class="header__controls__selected">
        <div class="upload-new-data">
          <img src="@/assets/arrow.svg" alt="icon" class="arrow" @click="$router.go(-1)" />
          <p>Upload New Data</p>
        </div>
        <k-button variant="secondary" negative="negative">Cancel Upload</k-button>
      </div>
    </header>
    <section class="content">
      <k-modal :open="openModal" uploading="true" v-if="isUploading === true">
        <div class="upload-modal-content">
          <div class="uploading-file"></div>
          <p>Just a second ...</p>
        </div>
      </k-modal>
      <!-- SIDEBAR -->
      <aside class="content__sidebar">
        <ul class="content__menu">
          <li class="content__menu__item active" @click="goToTab('all')">All Data</li>
          <li class="content__menu__item" @click="goToTab('published')">Published</li>
          <li class="content__menu__item" @click="goToTab('drafts')">Drafts</li>
          <li class="content__menu__item" @click="goToTab('deleted')">Deleted</li>
        </ul>
      </aside>
      <div class="content__body">
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.title"
            :class="['tab-item', activeTab === tab.title ? 'active' : '']"
            @click="activeTab = tab.title"
          >
            <p class="step">{{ tab.step }}</p>
            <p class="title">{{ tab.title }}</p>
          </button>
        </div>
        <div v-if="activeTab === 'REVIEW'">
          <div class="review__content">
            <p>review slot</p>
          </div>
          <div class="btn-wrapper">
            <k-button>Save & Publish</k-button>
          </div>
        </div>
        <div class="upload-content" v-if="activeTab === 'UPLOAD CSV'">
          <h4>UPLOAD CSV</h4>
          <p class="description">
            Uploads require an indicator, country, and dataset to create a new entry. You can update
            the rest of the fields later.
          </p>
          <section v-if="filename">
            <k-input label="Title" v-model="filename" :disabled="true"></k-input>
            <div class="btn-wrapper">
              <k-button>Next</k-button>
            </div>
          </section>
          <vue2Dropzone
            :useCustomSlot="true"
            id="file-dropzone"
            :options="dropzoneOptions"
            @vdropzone-file-added="addFile"
            v-else
          >
            <section class="upload-area">
              <input type="file" id="file-input" />
              <label for="file-input">
                <k-button variant="tertiary">Choose a file</k-button>
              </label>
              <p>Or drop your CSV file</p>
            </section>
          </vue2Dropzone>
        </div>
      </div>
    </section>
  </k-dashboard-layout>
</template>

<script>
import KUpload from './Upload';

export default KUpload;
</script>

<style lang="scss" src="./Upload.scss" scoped>
</style>
