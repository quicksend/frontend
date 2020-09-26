<template>
  <div class="breadcrumb">
    <nav class="breadcrumb__nav">
      <ul class="breadcrumb__items">
        <template v-for="(breadcrumb, idx) of $slots.default">
          <wrapper-node
            class="breadcrumb__item"
            :key="`breadcrumb-item-${idx}`"
            :node="breadcrumb"
            tag="li"
          />

          <li
            v-if="idx < $slots.default.length - 1"
            class="breadcrumb__item breadcrumb__item--seperator"
            :key="`breadcrumb-seperator-${idx}`"
          >
            <slot name="seperator" />
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import WrapperNode from "@/components/WrapperNode.vue";

@Component({
  components: {
    WrapperNode
  }
})
export default class Breadcrumb extends Vue {}
</script>

<style lang="scss" scoped>
.breadcrumb {
  @apply bg-white;
  @apply h-12;
  @apply px-4;
  @apply rounded-sm;
  @apply shadow-md;
  @apply w-full;

  &__item {
    &--seperator {
      @apply mx-2;
    }
  }

  &__items {
    @apply flex flex-row items-center;
  }

  &__nav {
    @apply flex;
    @apply h-full;
    @apply overflow-auto;
  }
}
</style>
