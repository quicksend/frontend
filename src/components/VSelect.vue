<template>
  <select>
    <option v-for="item of items" :key="item" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VSelect extends Vue {
  @Prop({ default: () => [] })
  private readonly items!: string[];
}
</script>

<style lang="scss" scoped></style>
