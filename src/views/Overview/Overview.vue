<template>
  <div class="overview">
    <k-dashboard-layout>
      <header class="overview__header">
        <div class="overview__header__content">
          <h1>Overview</h1>
          <p>Here’s a brief presentation of activity in the last 7 days.</p>
        </div>
        <div class="overview__controls">
          <k-input
            label="Duration"
            type="select"
            variant="dropdown"
            v-model="overviewDuration"
            :optionsDisplay="optionsDisplay"
          >
          </k-input>
        </div>
      </header>
      <section class="overview__content">
        <section class="search">
          <header class="header"><h2>Total Searches</h2></header>
          <div class="search__summary">
            <section class="search__summary__head">
              <div class="search__summary__head__total">{{ totalSearches | formatSearchVal }}</div>
              <div class="search__summary__head__other-details see-more">
                <div class="value">{{ totalClicked }}%</div>
                <div class="additional">clicked to see more</div>
              </div>
              <div class="search__summary__head__other-details new-account">
                <div class="value">{{ accounts }}</div>
                <div class="additional">created a new account</div>
              </div>
            </section>
            <section class="search__summary__body">
              <header class="search__summary__body__heading">Total Search Per Category</header>
              <div v-if="isLoadingChart" class="outer-pie round">
                <div class="radar"></div>
                <div class="inner-pie round"></div>
              </div>
              <div v-else class="search__summary__body__chart">
                <doughnut-wrapper
                  v-if="chartDataset.length && showChart === true && !isLoadingChart"
                  :labels="chartData.labels"
                  :datasets="chartData.datasets"
                ></doughnut-wrapper>
              </div>
              <div class="search__summary__body__labels">
                <div class="label" v-for="(label, i) in chartData.labels" :key="label">
                  <div
                    class="color"
                    :style="{ background: chartData.datasets[0].backgroundColor[i] }"
                  ></div>
                  <div class="value">{{ label }}</div>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section class="recents">
          <header class="header">
            <h2>Your Recent Activity</h2>
            <button
              @click="
                $router.push({ name: 'Activities', params: { type: 'admin' }, query: { userName } })
              "
              class="link"
            >
              View All
            </button>
          </header>
          <table class="recent-activity">
            <thead>
              <tr>
                <th v-for="field in displayFields" :key="field" :class="field" :id="field">
                  {{ field }}
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- loading state start-->
              <template v-if="isLoading">
                <tr v-for="i in Array(7).keys()" :key="i">
                  <td
                    v-for="field in displayFields"
                    :key="i + field"
                    :class="field"
                    :id="field"
                    style="height: 20px"
                  >
                    <div class="suspense w-70"></div>
                  </td>
                </tr>
              </template>
              <!-- loading state end -->
              <template v-else>
                <overview-table-row
                  v-for="activity in recentActivities"
                  :key="activity.activity + activity.createdAt"
                  :activity="activity"
                  :fields="displayFields"
                >
                </overview-table-row>
              </template>
              <!-- EMPTY STATE START -->
              <div v-if="!recentActivities" class="no-activity text-center">
                <div class="icon">
                  <svg width="22" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path :d="svgPath" fill="#666" />
                  </svg>
                </div>
                <p>There has been no recent activity in the last 7 days.</p>
              </div>
              <!-- EMPTY STATE END -->
            </tbody>
          </table>
        </section>

        <section class="active-customer">
          <h2>Most Active Customer</h2>
          <img :src="topUser.imageUrl || dummyImage" alt="" />
          <div class="active-customer__details">
            <p class="active-customer__name text-center">{{ topUser.fullName }}</p>
            <p class="active-customer__mail text-center">{{ topUser.email }}</p>
          </div>
          <button class="active-customer__button">View Profile</button>
        </section>

        <section class="active-users">
          <header class="header">
            <h2>Active Users</h2>
            <div class="active-users__controls">
              <k-input
                label="Duration"
                type="select"
                variant="dropdown"
                v-model="activeUserPeriod"
                :optionsDisplay="optionsDisplay"
              >
              </k-input>
            </div>
          </header>
          <div class="active-users__content" v-if="lineDatasets.length && showLineChart === true">
            <line-wrapper
              :labels="[]"
              :datasets="lineData.datasets"
              :isHours="activeUserPeriod === '24 hours'? true : false"
            ></line-wrapper>
          </div>
        </section>
      </section>
    </k-dashboard-layout>
  </div>
</template>

<script>
import DashboardOverview from './Overview';

export default DashboardOverview;
</script>

<style lang="scss" src="./Overview.scss" scoped></style>
