<template>
  <div class="form__wrapper">
    <div v-if="errorMessage" class="form__errors">
      <div class="form__error">
        <font-awesome-icon class="form__error-icon" :icon="icons.error" size="sm" />
        <span class="form__error-message">{{ errorMessage }}</span>
      </div>
    </div>

    <div v-else-if="successMessage" class="form__successes">
      <div class="form__success">
        <font-awesome-icon class="form__success-icon" :icon="icons.checkmark" size="sm" />
        <span class="form__success-message">{{ successMessage }}</span>
      </div>
    </div>

    <form ref="form" novalidate @submit.prevent="submit()">
      <slot />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { camelize } from "@/utils/camelize";

@Component({
  components: {
    FontAwesomeIcon
  }
})
export default class VForm extends Vue {
  @Ref() private readonly form!: HTMLFormElement;

  private errorMessage: string | null = null;
  private successMessage: string | null = null;

  private get icons() {
    return {
      check: faCheck,
      error: faExclamationTriangle
    };
  }

  private get inputs() {
    const inputs = [];

    for (const element of this.form.elements) {
      const field = element.attributes.getNamedItem("name");
      if (field) inputs.push(element as HTMLInputElement);
    }

    return inputs;
  }

  disable() {
    this.inputs.forEach(input => {
      input.disabled = true;
    });

    return this;
  }

  enable() {
    this.inputs.forEach(input => {
      input.disabled = false;
    });

    return this;
  }

  error(error?: Error | string) {
    this.hideSuccessMessage();
    this.errorMessage = typeof error === "string" ? error : (error && error.message) || null;

    console.error(error);

    return this;
  }

  hideErrorMessage() {
    this.errorMessage = null;

    return this;
  }

  hideSuccessMessage() {
    this.successMessage = null;

    return this;
  }

  reset() {
    this.errorMessage = null;
    this.successMessage = null;

    this.form.reset();

    return this;
  }

  success(message: string) {
    this.hideErrorMessage();
    this.successMessage = message;

    return this;
  }

  submit(emit = true) {
    const data: Record<string, boolean | number | string> = {};

    for (const element of this.form.elements) {
      const field = element.tagName === "INPUT" && element.attributes.getNamedItem("name");
      if (!field) continue;

      const key = camelize(field.value);
      const input = element as HTMLInputElement;

      switch (input.type) {
        case "checkbox":
          data[key] = input.checked;
          break;

        // Add other input types here if needed

        default:
          data[key] = input.value;
      }
    }

    if (emit) {
      this.$emit("submit", data);
    }

    return data;
  }
}
</script>

<style lang="scss" scoped>
.form {
  &__error {
    @apply flex items-center justify-center;
  }

  &__error-icon {
    @apply inline-block;
    @apply mr-2;
  }

  &__errors {
    @apply bg-red-600;
    @apply font-medium text-sm text-white;
    @apply mb-6;
    @apply p-2;
    @apply rounded;
  }

  &__success {
    @apply flex items-center justify-center;
  }

  &__success-icon {
    @apply inline-block;
    @apply mr-2;
  }

  &__successes {
    @apply bg-green-600;
    @apply font-medium text-sm text-white;
    @apply mb-6;
    @apply p-2;
    @apply rounded;
  }
}
</style>
