<template>
  <k-dashboard-layout>
    <header class='country__header'>
      <div class='country__header--left'>
        <span @click='$router.go(-1)'><img alt='' src='@/assets/back.svg' />Go Back</span>
        <h1>Manage Country Dashboard</h1>
      </div>
      <div class='country__header--right'>
        <k-input v-model='search' label='Search for country' reactive></k-input>
        <k-button @click="$router.push({ name: 'AddCountry' })">Add New Country</k-button>
      </div>
    </header>
    <section class='country__body'>
      <template v-if='isFetching'>
        <div class='country-card suspense' v-for='i in [1,2,3]' :key='i'></div>
      </template>
      <template v-else>
        <div v-for='country in dashboardList' :key='country.id' class='country-card'>
          <div class='country-card--image'>
            <img :src='country.imageUrl' alt='' class='card-image' />
          </div>
          <div class='country-card--texts'>
            <p class='country-name'>{{ titleCase(country.name) }}</p>
            <div class='card-btns'>
              <k-button
                size='small'
                variant='link'
                @click="$router.push({ name: 'ViewSingleCountry', params: {id: country.id} })"
              >
                Edit
              </k-button>
              <k-button
                size='small'
                variant='link'
                @click='deleteCountry({id: country.id})'
              >
                Remove
              </k-button>
            </div>
          </div>
        </div>
      </template>
      <k-pagination
        :forTable='true'
        :maxItemsOnPage='20'
        :page='page'
        :totalItems='pagination.totalItems'
        :totalPages='pagination.totalPages'
        variant='many'
        @goToFirst='page = 1'
        @goToLast='page = pagination.totalPages'
        @goToNext='page += 1'
        @goToPrev='page -= 1'
      ></k-pagination>
    </section>
  </k-dashboard-layout>
</template>

<script>
import Country from './ManageCountry';

export default Country;
</script>

<style lang='scss' scoped src='./ManageCountry.scss'></style>
