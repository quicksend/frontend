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
  @Prop({ default: "" }) private readonly label!: string;
  @Prop({ default: "" }) private readonly name!: string;

  @Ref() private readonly input!: HTMLInputElement;

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
    @apply border-2 border-gray-700 rounded;
    @apply h-4 w-4;
    @apply mr-2;

    transition: background-color 0.1s ease-in, border-color 0.1s ease-in;
  }

  &__checkmark {
    @apply hidden;
    @apply text-white;
  }

  &__input {
    @apply absolute;
    @apply h-4 w-4;
    @apply opacity-0;
  }

  &__input:checked ~ &__box {
    @apply bg-primary-500;
    @apply border-primary-500;
  }

  &__input:checked ~ &__box > &__checkmark {
    @apply block;
  }

  &__input:checked:disabled ~ &__box {
    @apply bg-primary-400;
    @apply border-primary-400;
  }

  &__input:not(:checked):disabled ~ &__box {
    @apply bg-gray-200;
    @apply border-gray-600;
  }

  &__input:not(:disabled),
  &__input:not(:disabled) ~ &__label {
    @apply cursor-pointer;
  }

  &__input:focus ~ &__box {
    @apply shadow-outline;
  }

  &__input:hover:not(:checked):not(:disabled) ~ &__box {
    @apply bg-gray-300;
  }

  &__label {
    @apply font-medium text-gray-800 text-sm;
    @apply select-none;

    margin-top: 1px;
  }
}
</style>
