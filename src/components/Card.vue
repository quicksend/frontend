<template>
  <div class="card" :style="{ backgroundColor: bgColor }">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop({ default: "#fff" }) private readonly bgColor!: string;
}
</script>

<style lang="scss" scoped>
.card {
  @apply p-10;
  @apply rounded-md;
  @apply shadow-lg;
}
</style>
