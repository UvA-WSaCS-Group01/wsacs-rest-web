<template>
  <div id="app">
    <!-- As a link -->
      <b-navbar variant="faded" type="light" class="bg-light">
        <b-navbar-brand href="#" >shortURL</b-navbar-brand>
      </b-navbar>
      <UrlShortenerClient />
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
