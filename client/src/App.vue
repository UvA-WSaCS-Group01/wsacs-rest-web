<template>
  <div id="app">
    <!-- As a link -->
      <b-navbar variant="faded" type="light">
        <b-navbar-brand href="#">BootstrapVue</b-navbar-brand>
      </b-navbar>
    <b-container>
      <b-row>
        <b-col cols="12">
          <UrlShortenerClient msg="Welcome to Your Vue.js App" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UrlShortenerClient from "./components/UrlShortenerClient.vue";

export default {
  name: "App",
  components: {
    UrlShortenerClient
  }
};
</script>

<style>
</style>
