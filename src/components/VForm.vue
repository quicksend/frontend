<template>
  <div class="form__wrapper">
    <div v-if="error" class="form__errors">
      <div class="form__error">
        <font-awesome-icon class="form__error-icon" size="sm" :icon="errorIcon" />
        <span class="form__error-message">{{ error }}</span>
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
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { camelize } from "@/utils/camelize";

@Component({
  components: {
    FontAwesomeIcon
  }
})
export default class VForm extends Vue {
  @Ref() private readonly form!: HTMLFormElement;

  private error: string | null = null;

  private get errorIcon() {
    return faExclamationTriangle;
  }

  hideError() {
    this.error = null;
  }

  showError(message?: string) {
    this.error = message || "An error has occured, please try again later!";
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
}
</style>
