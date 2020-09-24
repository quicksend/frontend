<template>
  <button class="button" :disabled="disabled">
    <scale-loader v-if="isLoading" class="button__loader" color="#f6f9fc" height="16px" />
    <slot v-else />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

@Component({
  components: {
    ScaleLoader
  }
})
export default class VButton extends Vue {
  private disabled = false;
  private isLoading = false;

  disable() {
    this.disabled = true;

    return this;
  }

  enable() {
    this.disabled = false;

    return this;
  }

  finish() {
    this.isLoading = false;

    return this;
  }

  load() {
    this.isLoading = true;

    return this;
  }
}
</script>

<style lang="scss" scoped>
.button {
  @apply bg-primary-500;
  @apply font-medium text-base text-white;
  @apply h-12 w-full;
  @apply outline-none;
  @apply px-2 py-3;
  @apply rounded-md;

  transition: background-color 0.15s ease-in-out;

  &:active {
    @apply bg-primary-500 #{!important};
  }

  &:disabled {
    @apply bg-primary-400;
    @apply cursor-default;
    @apply pointer-events-none;
  }

  &:focus:not(:disabled) {
    @apply shadow-outline;
  }

  &:focus:not(:disabled),
  &:hover:not(:disabled) {
    background-color: lighten(#395eca, 5%);
  }

  &__loader {
    @apply flex justify-center;
  }
}
</style>
