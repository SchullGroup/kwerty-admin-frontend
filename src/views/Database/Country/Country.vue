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
          <p class="total">400.3K</p>
          <div class="total-activity-container">
            <p class="total-activity">
              32.12K
              <span>requests sent</span>
            </p>
            <p class="total-activity">
              234.01K
              <span>chart clicks</span>
            </p>
          </div>
        </div>
        <p class="description">Total Visits Per Country</p>
        <div class="chart__content-wrapper">
          <div class="chart__item">
            <doughnut-wrapper
              :labels="doughnutLabels"
              :datasets="doughnutDatasets"
            ></doughnut-wrapper>
          </div>
          <div class="chart__labels">
            <div class="label" v-for="(label, i) in doughnutLabels" :key="label">
              <div
                class="color"
                :style="{ background: doughnutDatasets[0].backgroundColor[i] }"
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
        <ul class="countries-not-found--table">
          <li>
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
              South Africa</span
            >
            <span class="value">342</span>
          </li>
          <li>
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
              South Africa</span
            >
            <span class="value">342</span>
          </li>
          <li>
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
              South Africa</span
            >
            <span class="value">342</span>
          </li>
          <li>
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
              South Africa</span
            >
            <span class="value">342</span>
          </li>
          <li>
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
              South Africa</span
            >
            <span class="value">342</span>
          </li>
          <li>
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
              South Africa</span
            >
            <span class="value">342</span>
          </li>
          <li>
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
              South Africa</span
            >
            <span class="value">342</span>
          </li>
          <li>
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
              South Africa</span
            >
            <span class="value">342</span>
          </li>
          <li>
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
              South Africa</span
            >
            <span class="value">342</span>
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
            <tr>
              <td>
                <div class="profile">
                  <img src="@/assets/lady.jpg" alt="" />
                </div>
                Sam Toku
              </td>
              <td>oolajumoke@kwerty.finance</td>
            </tr>
            <tr>
              <td>
                <div class="profile">
                  <img src="@/assets/lady.jpg" alt="" />
                </div>
                Sam Toku
              </td>
              <td>oolajumoke@kwerty.finance</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </k-dashboard-layout>
</template>

<script>
import CountryDashboard from './Country';

export default CountryDashboard;
</script>

<style lang="scss" scoped src="./Country.scss"></style>
