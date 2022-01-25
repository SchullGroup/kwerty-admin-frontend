<template>
  <k-dashboard-layout>
    <header class="country__header">
      <div class="country__header--left">
        <span @click="$router.go(-1)"><img src="@/assets/back.svg" alt="" />Go Back</span>
        <h1>Nigeria: Country Dashboard</h1>
      </div>
      <div class="country__header--right">
        <k-button variant="secondary" negative="negative">Cancel</k-button>
        <k-button variant="secondary">Save & Publish</k-button>
      </div>
    </header>
    <section class="country__body">
      <div class="country--profile">
        <div class="country--profile-image">
          <k-input></k-input>
          <div class="country-picture-wrapper">
            <!-- <img src="@/assets/nigeria.jpg" alt="pic" class="country-picture" /> -->
            <img :src="url" alt="" class="country-picture" />
          </div>
          <k-button class="btn" variant="tertiary">
            <input
              type="file"
              name="picture"
              id="image-upload"
              accept="image/*"
              @change="uploadImage($event)"
            />
            {{ url === '' ? 'Add Photo' : 'Change Photo' }}
          </k-button>
        </div>
        <div class="country--profile-content">
          <k-input variant="textarea" label="Description"></k-input>
        </div>
      </div>
      <div class="country__content">
        <div class="summary--indicators">
          <p class="heading">Top Indicator Summaries</p>
          <k-input
            label="Search for indicator"
            type="select"
            variant="dropdown"
            v-model="selectedIndicator"
            :optionsDisplay="optionsIndicators"
            @input="addIndicator"
          ></k-input>
          <ul class="summary--indicators-items">
            <li class="name" v-for="(item, index) in indicators" :key="index">
              {{ item }}
              <span @click="removeItem(index, indicators)"
                ><img src="@/assets/deleteIcon.svg" alt="icon"
              /></span>
            </li>
          </ul>
          <!-- EMPTY STATE  -->
          <div v-if="indicators.length === 0" class="no-activity text-center">
            <div class="icon">
              <img src="@/assets/empty.svg" alt="icon" />
            </div>
            <p>No indicators selected</p>
          </div>
        </div>
        <div class="top--charts">
          <p class="heading">Top Charts</p>
          <k-input
            label="Search for indicator"
            type="select"
            variant="dropdown"
            v-model="selectedChart"
            :optionsDisplay="optionsCharts"
            @input="addTopChart"
          ></k-input>
          <ul class="summary--indicators-items">
            <li class="name" v-for="(item, index) in charts" :key="index">
              {{ item }}
              <span @click="removeItem(index, charts)"
                ><img src="@/assets/deleteIcon.svg" alt="icon"
              /></span>
            </li>
          </ul>
          <!-- EMPTY STATE  -->
          <div v-if="charts.length === 0" class="no-activity text-center">
            <div class="icon">
              <img src="@/assets/empty.svg" alt="icon" />
            </div>
            <p>No Charts selected</p>
          </div>
          <!-- Empty state end -->
          <div class="top--charts-resources">
            <p class="title">Resources</p>
            <ul class="summary--indicators-items resources">
              <li class="name" v-for="item in resources" :key="item">
                <span class="resource-item"
                  ><img src="@/assets/pdf.svg" alt="icon" />
                  {{ item }}
                </span>
                <span><img src="@/assets/deleteIcon.svg" alt="icon" /></span>
              </li>
            </ul>
            <k-button class="upload-btn" variant="tertiary">
              <input
                type="file"
                name="picture"
                id="file-upload"
                accept="application/*"
                @change="uploadFile($event)"
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
import { KDashboardLayout, KButton, KInput } from '@/components';

export default {
  name: 'SingleCountry',
  components: {
    KDashboardLayout,
    KButton,
    KInput,
  },
  data: () => ({
    url: '',
    search: '',
    selectedIndicator: '',
    selectedChart: '',
    item: '',
    optionsIndicators: {
      'Central Budget': 'Central Budget',
      'Current Account': 'Current Account',
      'Primary Income': 'Primary Income',
      'Secondary Income': 'Secondary Income',
      'Capital Account': 'Capital Account',
      'Financial Account': 'Financial Account',
      'Current Account to GDP': 'Current Account to GDP',
      'Official Reserve Assets': 'Official Reserve Assets',
      'Public Finance Sector Revenue': 'Public Finance Sector Revenue',
    },
    optionsCharts: {
      'Central Budget': 'Central Budget',
      'Current Account': 'Current Account',
      'Primary Income': 'Primary Income',
    },
    indicators: [],
    charts: [],
    resources: ['Nigeria Public Debt Report  2022', 'Nigeria’s Approved Budget 2023: A Case Study'],
  }),
  computed: {},
  watch: {},
  methods: {
    addIndicator(val) {
      this.indicators.push(val);
    },
    addTopChart(val) {
      this.charts.push(val);
    },
    removeItem(index, from) {
      from.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped src="./SingleCountry.scss"></style>
