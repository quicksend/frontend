<template>
  <div id="layout layout--default">
    <main id="layout__content">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped>
#layout {
  &__content {
    @apply px-2;
  }
}
</style>
