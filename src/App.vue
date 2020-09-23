<template>
  <div id="app">
    <component v-if="$route.meta.layout" :is="$route.meta.layout">
      <router-view />
    </component>

    <default-layout v-else>
      <router-view />
    </default-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import DefaultLayout from "@/layouts/Default.vue";

@Component({
  components: {
    DefaultLayout
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");

body {
  background-color: #f6f9fc;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
