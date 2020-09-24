<template>
  <div id="layout-default">
    <main id="layout-default__content">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
#layout-default {
  &__content {
  }
}
</style>
