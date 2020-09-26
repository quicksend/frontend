<template>
  <div class="breadcrumb-item" @click="$emit('click', path)">
    <router-link
      v-if="to"
      active-class="breadcrumb-item__link--current"
      class="breadcrumb-item__link"
      :class="{ 'breadcrumb-item__link--active': active }"
      :to="to"
    >
      <slot />
    </router-link>

    <div v-else class="breadcrumb-item__link" :class="{ 'breadcrumb-item__link--active': active }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BreadcrumbItem extends Vue {
  @Prop({ default: false }) private readonly active!: boolean;
  @Prop({ default: null }) private readonly path!: string;
  @Prop({ default: null }) private readonly to!: string;
}
</script>

<style lang="scss" scoped>
.breadcrumb-item {
  &__link {
    @apply cursor-pointer;
    @apply flex flex-row items-center;
    @apply font-medium text-gray-800;
    @apply select-none;

    &:hover {
      @apply text-primary-600;
    }

    &--active {
      @apply text-primary-500;
    }
  }
}
</style>
