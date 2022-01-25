<template>
  <k-dashboard-layout>
    <header class="country__header">
      <div class="country__header--left">
        <span @click="$router.go(-1)"><img src="@/assets/back.svg" alt="" />Go Back</span>
        <h1>Manage Country Dashboard</h1>
      </div>
      <div class="country__header--right">
        <k-input label="Search for country" v-model="search" reactive></k-input>
        <k-button @click="modalOpen = true">Add New Country</k-button>
      </div>
    </header>
    <section class="country__body">
      <div class="country-card">
        <div class="country-card--image">
          <img src="@/assets/country1.jpg" alt="" class="card-image" />
        </div>
        <div class="country-card--texts">
          <p class="country-name">Nigeria</p>
          <div class="card-btns">
            <k-button variant="link" size="small" @click="$router.push({ name: 'SingleCountry' })"
              >Edit</k-button
            >
            <k-button variant="link" size="small">Remove</k-button>
          </div>
        </div>
      </div>
      <div class="country-card">
        <div class="country-card--image">
          <img src="@/assets/country2.png" alt="" class="card-image" />
        </div>
        <div class="country-card--texts">
          <p class="country-name">Ghana</p>
          <div class="card-btns">
            <k-button variant="link" size="small">Edit</k-button>
            <k-button variant="link" size="small">Remove</k-button>
          </div>
        </div>
      </div>
      <div class="country-card">
        <div class="country-card--image">
          <img src="@/assets/country3.png" alt="" class="card-image" />
        </div>
        <div class="country-card--texts">
          <p class="country-name">Kenya</p>
          <div class="card-btns">
            <k-button variant="link" size="small">Edit</k-button>
            <k-button variant="link" size="small">Remove</k-button>
          </div>
        </div>
      </div>
      <div class="country-card">
        <div class="country-card--image">
          <img src="@/assets/country4.png" alt="" class="card-image" />
        </div>
        <div class="country-card--texts">
          <p class="country-name">Egypt</p>
          <div class="card-btns">
            <k-button variant="link" size="small">Edit</k-button>
            <k-button variant="link" size="small">Remove</k-button>
          </div>
        </div>
      </div>
      <div class="country-card">
        <div class="country-card--image">
          <img src="@/assets/country5.png" alt="" class="card-image" />
        </div>
        <div class="country-card--texts">
          <p class="country-name">Cameroon</p>
          <div class="card-btns">
            <k-button variant="link" size="small">Edit</k-button>
            <k-button variant="link" size="small">Remove</k-button>
          </div>
        </div>
      </div>
      <div class="country-card">
        <div class="country-card--image">
          <img src="@/assets/country6.png" alt="" class="card-image" />
        </div>
        <div class="country-card--texts">
          <p class="country-name">South Africa</p>
          <div class="card-btns">
            <k-button variant="link" size="small">Edit</k-button>
            <k-button variant="link" size="small">Remove</k-button>
          </div>
        </div>
      </div>
      <div class="country-card">
        <div class="country-card--image">
          <img src="@/assets/country7.png" alt="" class="card-image" />
        </div>
        <div class="country-card--texts">
          <p class="country-name">Namibia</p>
          <div class="card-btns">
            <k-button variant="link" size="small">Edit</k-button>
            <k-button variant="link" size="small">Remove</k-button>
          </div>
        </div>
      </div>
      <k-pagination
        :forTable="true"
        :page="pagination.page"
        :maxItemsOnPage="20"
        :totalItems="pagination.totalItems"
        :totalPages="pagination.totalPages"
        variant="many"
        @goToNext="nextPage"
        @goToPrev="prevPage"
        @goToFirst="firstPage"
        @goToLast="lastPage"
      ></k-pagination>
    </section>
  </k-dashboard-layout>
</template>

<script>
import Country from './ManageCountry';

export default Country;
</script>

<style lang="scss" src="./ManageCountry.scss" scoped></style>
