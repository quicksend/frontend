<template>
  <div class="activity-bar-item">
    <router-link
      v-if="to"
      active-class="activity-bar-item__link--current"
      class="activity-bar-item__link"
      :title="name"
      :to="to"
    >
      <slot class="activity-bar-item__icon" />
    </router-link>

    <div v-else class="activity-bar-item__link" :title="name">
      <slot class="activity-bar-item__icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ActivityBarItem extends Vue {
  @Prop({ default: null }) private readonly name!: string;
  @Prop({ default: null }) private readonly to!: string;
}
</script>

<style lang="scss" scoped>
.activity-bar-item {
  @apply h-16 w-full;

  &__link {
    @apply flex items-center justify-center;
    @apply h-full w-full;
    @apply shadow-none;
    @apply text-primary-300;

    &--current {
      @apply relative;

      &::before {
        @apply absolute;
        @apply bg-primary-300;
        @apply left-0;

        content: "";
        height: 48px;
        width: 2px;

        @screen sm_max {
          @apply bottom-0;
          @apply w-full;

          height: 2px;
        }
      }
    }
  }
}
</style>
