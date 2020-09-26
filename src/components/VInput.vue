<template>
  <div class="input">
    <label class="input__label" :for="`input-${sluggedLabel}`">
      {{ label }}
    </label>

    <input
      ref="input"
      v-bind="$props"
      class="input__box"
      :class="{ 'input__box--error': errorMessage }"
      :id="`input-${sluggedLabel}`"
      @input="$emit('input', $event.target.value)"
    />

    <div v-if="errorMessage" class="input__errors">
      <div class="input__error">
        <font-awesome-icon class="input__error-icon" :icon="icons.error" size="sm" />
        <span class="input__error-message">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { slugify } from "@/utils/slugify";

@Component({
  components: {
    FontAwesomeIcon
  }
})
export default class VInput extends Vue {
  @Prop() readonly autocomplete!: boolean;
  @Prop() readonly autofocus!: boolean;
  @Prop() readonly disabled!: boolean;
  @Prop() readonly maxlength!: number;
  @Prop() readonly min!: number;
  @Prop() readonly minlength!: number;
  @Prop() readonly name!: string;
  @Prop() readonly pattern!: string;
  @Prop() readonly placeholder!: string;
  @Prop() readonly readonly!: boolean;
  @Prop() readonly required!: boolean;
  @Prop() readonly size!: number;
  @Prop() readonly step!: number;
  @Prop() readonly type!: string;

  @Prop({ required: true }) readonly label!: string;
  @Prop({ type: [Number, String] }) readonly value!: string | number;

  @Ref() readonly input!: HTMLInputElement;

  private errorMessage: string | null = null;

  private get icons() {
    return {
      error: faExclamationTriangle
    };
  }

  get sluggedLabel() {
    return slugify(this.label);
  }

  error(error?: Error | string) {
    this.errorMessage = typeof error === "string" ? error : (error && error.message) || null;

    return this;
  }

  hideErrorMessage() {
    this.errorMessage = null;

    return this;
  }
}
</script>

<style lang="scss" scoped>
.input {
  @apply flex flex-col;
  @apply mb-6;

  &__box {
    @apply border border-solid border-gray-500 rounded-md;
    @apply outline-none;
    @apply px-4 py-2;
    @apply text-sm text-gray-900;

    min-height: 45px;

    &:disabled {
      @apply bg-gray-200;
    }

    &:focus {
      @apply shadow-outline;
    }

    &--error {
      @apply border-red-500;
    }
  }

  &__error-icon {
    @apply inline-block;
    @apply mr-2;
  }

  &__errors {
    @apply font-medium text-sm text-red-600;
    @apply mt-2;
  }

  &__label {
    @apply font-medium text-sm text-gray-800;
    @apply mb-3;
  }
}
</style>
