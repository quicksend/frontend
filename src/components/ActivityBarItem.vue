<template>
  <div class="activity-bar-item">
    <router-link
      v-if="to"
      active-class="activity-bar-item--current"
      class="activity-bar-item__link"
      :to="to"
    >
      <slot class="activity-bar-item__icon" />
    </router-link>

    <div v-else class="activity-bar-item__link">
      <slot class="activity-bar-item__icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ActivityBarItem extends Vue {
  @Prop({ default: "" }) private readonly name!: string;
  @Prop({ default: null }) private readonly to!: string;
}
</script>

<style lang="scss" scoped>
.activity-bar-item {
  @apply h-16 w-full;

  &--current {
    @apply border-l-2 border-solid border-primary-300;

    @screen sm_max {
      @apply border-b-2 border-l-0;
    }
  }

  &__link {
    @apply flex items-center justify-center;
    @apply h-full w-full;
    @apply shadow-none;
    @apply text-primary-300;
  }
}
</style>
