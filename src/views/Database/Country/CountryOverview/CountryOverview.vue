<template>
  <k-dashboard-layout>
    <header class="country-dash__header">
      <div>
        <h1>Overview</h1>
        <p>Here’s a brief presentation of activity on the Country Dashboard in the last 7 days.</p>
      </div>
      <div class="header--right">
        <k-input
          type="select"
          label="Duration"
          v-model="duration"
          variant="dropdown"
          :optionsDisplay="optionsDisplay"
        ></k-input>
        <k-button @click="$router.push({ name: 'ManageCountry' })"
          >Manage the Country Dashboard</k-button
        >
      </div>
    </header>
    <section class="country-dash__body">
      <div class="chart__content item">
        <p class="title">Total Visits (all time)</p>
        <div class="chart-total-summary">
          <p class="total">{{ totalVisit | formatSearchVal }}</p>
          <div class="total-activity-container">
            <p class="total-activity">
              {{ totalRequestSent | formatSearchVal }}
              <span>requests sent</span>
            </p>
            <p class="total-activity">
              {{ totalChartClicked | formatSearchVal }}
              <span>chart clicks</span>
            </p>
          </div>
        </div>
        <p class="description">Total Visits Per Country</p>
        <div class="chart__content-wrapper">
          <div class="chart__item">
            <div v-if="isLoadingChart" class="outer-pie round">
              <div class="radar"></div>
              <div class="inner-pie round"></div>
            </div>
            <div class="empty-state" v-else-if="totalVisitsPerCountry.length === 0">
              <p>There has been no visit per country in the last {{ duration }}</p>
            </div>
            <div v-else>
              <doughnut-wrapper
                v-if="totalVisitsPerCountry.length && showChart === true && !isLoadingChart"
                :labels="chartData.labels"
                :datasets="chartData.datasets"
              ></doughnut-wrapper>
            </div>
          </div>
          <div class="chart__labels">
            <div class="label" v-for="(label, i) in chartData.labels" :key="label">
              <div
                class="color"
                :style="{ background: chartData.datasets[0].backgroundColor[i] }"
              ></div>
              <div class="value">{{ label }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="countries-not-found item">
        <p class="title">List of Countries Not Found</p>
        <div class="table--header">
          <p>Country</p>
          <p>No of Searches</p>
        </div>
        <div v-if="isLoading === true" class="loading-state">
          <ul>
            <li v-for="(country, index) in countriesNotFound" :key="index">
              <div>
              </div>
              <div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else-if="countriesNotFound.length ===0 && isLoading" class="not-found-empty-state">
          <p>There has been no search for non existing countries in the last {{ duration }}</p>
        </div>
        <ul v-else class="countries-not-found--table">
          <li v-for="(country, index) in countriesNotFound" :key="index">
            <span class="country">
              <span class="arrow">
                <svg
                  :class="[status === 'down' ? 'svgUp' : 'svgDown']"
                  width="8"
                  height="6"
                  viewBox="0 0 8 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path :d="path" />
                </svg>
              </span>
              {{ country.name }}</span
            >
            <span class="value">{{ country.count }}</span>
          </li>
        </ul>
      </div>
      <div class="top-users__content item">
        <p class="title">Top Users</p>
        <table>
          <thead>
            <tr>
              <th>Customers</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in topUsers" :key="user.id">
              <td>
                <div class="profile">
                  <img :src="user.imageUrl || avatar" alt="" />
                </div>
                <span>
                  {{ user.fullName }}
                </span>
              </td>
              <td>
                <span>
                  {{ user.email }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </k-dashboard-layout>
</template>

<script>
import CountryDashboard from './CountryOverview';

export default CountryDashboard;
</script>

<style lang="scss" scoped src="./CountryOverview.scss"></style>
