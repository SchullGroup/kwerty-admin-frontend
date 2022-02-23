<template>
  <k-dashboard-layout>
    <header class='country__header'>
      <div class='country__header--left'>
        <span @click='$router.go(-1)'><img alt='' src='@/assets/back.svg' />Go Back</span>
        <h1>{{ countriesOptions[country] }}<span v-if='country'>:</span> Country Dashboard</h1>
      </div>
      <div class='country__header--right'>
        <k-button
          negative='negative'
          variant='secondary'
          @click='$router.go(-1)'
        >
          Cancel
        </k-button>
        <k-button
          :loading='saving'
          variant='secondary'
          @click='saveDashboard'
        >
          Save & Publish
        </k-button>
      </div>
    </header>
    <section class='country__body'>
      <div class='country--profile'>
        <div class='country--profile-image'>
          <div class='select-country' v-if='!isEditView'>
            <k-input
              v-model='country'
              :optionsDisplay='countriesOptions'
              label='Country'
              searchInside='countries'
              type='select'
              variant='dropdown'
            ></k-input>
          </div>
          <div class='country-picture-wrapper'>
            <!-- <img src="@/assets/nigeria.jpg" alt="pic" class="country-picture" /> -->
            <img
              v-if='dashboard.imageUrl'
              :src='dashboard.imageUrl'
              alt=''
              class='country-picture'
            />
          </div>
          <k-button class='btn' variant='tertiary' :loading='isUploadingImage'>
            <input
              id='image-upload'
              accept='image/*'
              name='picture'
              type='file'
              @change='uploadCountryImage($event)'
            />
            {{ !isEditView ? 'Add Photo' : 'Change Photo' }}
          </k-button>
        </div>
        <div class='country--profile-content'>
          <k-input
            v-model='dashboard.description'
            label='Description'
            variant='textarea'
          ></k-input>
        </div>
      </div>
      <div class='country__content'>
        <div class='summary--indicators'>
          <p class='heading'>Top Indicator Summaries</p>
          <k-input
            v-model='selectedIndicator'
            :disabled='!dashboard.name'
            :optionsDisplay='indicatorOptions'
            label='Search for indicator'
            searchInside='indicators'
            type='select'
            @input='addIndicator'
            @search='(searchValue) => searchDatasets({searchValue})'
          ></k-input>
          <ul class='summary--indicators-items'>
            <li v-for='(item, index) in indicatorsShownList' :key='index' class='name'>
              {{ item }}
              <span
                @click='removeItem(index, indicators)'
              >
                <img alt='icon' src='@/assets/deleteIcon.svg' />
              </span>
            </li>
          </ul>
          <!-- EMPTY STATE  -->
          <div v-if='indicators.length === 0' class='no-activity text-center'>
            <div class='icon'>
              <img alt='icon' src='@/assets/empty.svg' />
            </div>
            <p>No indicators selected</p>
          </div>
        </div>
        <div class='top--charts'>
          <p class='heading'>Top Charts</p>
          <k-input
            v-model='selectedChart'
            :disabled='!dashboard.name'
            :optionsDisplay='indicatorOptions'
            label='Search for indicator'
            searchInside='indicators'
            type='select'
            @input='addTopChart'
            @search='(searchValue) => searchDatasets({searchValue})'
          ></k-input>
          <ul class='summary--indicators-items'>
            <li v-for='(item, index) in chartsShownList' :key='index' class='name'>
              {{ item }}
              <span @click='removeItem(index, charts)'
              ><img alt='icon' src='@/assets/deleteIcon.svg'
              /></span>
            </li>
          </ul>
          <!-- EMPTY STATE  -->
          <div v-if='charts.length === 0' class='no-activity text-center'>
            <div class='icon'>
              <img alt='icon' src='@/assets/empty.svg' />
            </div>
            <p>No Charts selected</p>
          </div>
          <!-- Empty state end -->
          <div class='top--charts-resources'>
            <p class='title'>Resources</p>
            <ul class='summary--indicators-items resources'>
              <li v-for='[name, url] in resources' :key='url' class='name'>
                <span class='resource-item'>
                  <img alt='icon' src='@/assets/pdf.svg' />
                  {{ name }}
                </span>
                <span @click='removeResource(name)'>
                  <img alt='icon' src='@/assets/deleteIcon.svg' />
                </span>
              </li>
            </ul>
            <k-button :loading='isUploadingResource' class='upload-btn' variant='tertiary'>
              <input
                id='file-upload'
                accept='application/*'
                name='picture'
                type='file'
                @change='uploadResource($event)'
              />
              Click to Upload Document(s)
            </k-button>
          </div>
        </div>
      </div>
    </section>
  </k-dashboard-layout>
</template>

<script>
import AddCountry from './AddCountry';

export default AddCountry;
</script>

<style lang='scss' scoped src='./AddCountry.scss'></style>
