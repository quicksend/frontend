<template>
  <div class="checkbox">
    <input
      ref="input"
      class="checkbox__input"
      :id="`input-${sluggedLabel}`"
      :name="name"
      type="checkbox"
    />

    <div class="checkbox__box">
      <font-awesome-icon class="checkbox__checkmark" size="xs" :icon="checkmarkIcon" />
    </div>

    <label class="checkbox__label" :for="`input-${sluggedLabel}`">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { slugify } from "@/utils/slugify";

@Component({
  components: {
    FontAwesomeIcon
  }
})
export default class VInput extends Vue {
  @Ref() private readonly input!: HTMLInputElement;

  @Prop({ default: "" })
  private readonly label!: string;

  @Prop({ default: "" })
  private readonly name!: string;

  private readonly sluggedLabel = slugify(this.label);

  private get checkmarkIcon() {
    return faCheck;
  }

  get value() {
    return this.input.checked;
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  @apply flex flex-row items-center;
  @apply mb-6;

  &__box {
    @apply border-2;
    @apply cursor-pointer;
    @apply mr-2;

    border-color: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    height: 16px;
    width: 16px;
    transition: background-color 0.1s ease-in;
  }

  &__checkmark {
    @apply hidden;
    @apply text-white;
  }

  &__input {
    @apply absolute;
    @apply cursor-pointer;
    @apply opacity-0;

    height: 16px;
    width: 16px;
  }

  &__input:checked ~ &__box {
    @apply bg-primary-500;
    @apply border-primary-500;
  }

  &__input:checked ~ &__box > &__checkmark {
    @apply block;
  }

  &__input:focus ~ &__box {
    @apply shadow-outline;
  }

  &__input:hover:not(:checked) ~ &__box {
    border-color: rgba(0, 0, 0, 0.5);
  }

  &__label {
    @apply cursor-pointer;
    @apply font-medium text-primary-800 text-sm;
    @apply select-none;

    margin-top: 1px;
  }
}
</style>
