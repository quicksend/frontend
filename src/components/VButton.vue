<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VButton extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  @apply bg-primary-500;
  @apply font-medium text-white;
  @apply outline-none;
  @apply px-2 py-3;
  @apply rounded-md;
  @apply w-full;

  transition: background-color 0.1s ease-in;

  &:active {
    @apply bg-primary-500 #{!important};
  }

  &:disabled {
    @apply bg-primary-400;
    @apply cursor-default;
  }

  &:focus:not(:disabled) {
    @apply shadow-outline;
  }

  &:focus:not(:disabled),
  &:hover:not(:disabled) {
    background-color: lighten(#395eca, 5%);
  }
}
</style>
