<template>
  <div class="register">
    <card class="register__card">
      <h1 class="register__title">Create your account</h1>
      <h2 class="register__subtitle">Start uploading your files in no time!</h2>

      <v-form ref="form" class="register__form" @submit="register">
        <v-input
          ref="usernameInput"
          autocomplete="username"
          autofocus
          label="Username"
          name="username"
          v-model.lazy.trim="username"
          @input="validate"
        />

        <v-input
          ref="emailInput"
          autocomplete="email"
          label="Email Address"
          name="email"
          type="email"
          v-model.lazy.trim="emailAddress"
          @input="validate"
        />

        <v-input
          ref="passwordInput"
          autocomplete="new-password"
          label="Password"
          name="password"
          type="password"
          v-model.lazy.trim="password"
          @input="validate"
        />

        <v-input
          ref="passwordConfirmationInput"
          autocomplete="new-password"
          label="Confirm Password"
          name="confirm-password"
          type="password"
          v-model.lazy.trim="passwordConfirmation"
          @input="validate"
        />

        <v-button ref="submitButton" :disabled="$v.$invalid" type="submit">
          Register
        </v-button>
      </v-form>

      <p class="register__recaptcha">
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a>
        apply.
      </p>
    </card>

    <div class="register__footer">
      <p>
        <span class="register__footer-text">Already have an account? </span>
        <router-link to="login">Sign In</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";

import { alphaNum, email, minLength, required, sameAs } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import { register } from "@/api/auth/register.api";

import Card from "@/components/Card.vue";
import Checkbox from "@/components/Checkbox.vue";
import VButton from "@/components/VButton.vue";
import VForm from "@/components/VForm.vue";
import VInput from "@/components/VInput.vue";

@Component({
  components: {
    Card,
    Checkbox,
    VButton,
    VForm,
    VInput
  },
  mixins: [validationMixin]
})
export default class Register extends Vue {
  @Ref() private readonly emailInput!: VInput;
  @Ref() private readonly form!: VForm;
  @Ref() private readonly passwordInput!: VInput;
  @Ref() private readonly passwordConfirmationInput!: VInput;
  @Ref() private readonly submitButton!: VButton;
  @Ref() private readonly usernameInput!: VInput;

  @Validate({ email, required })
  private emailAddress = "";

  @Validate({ minLength: minLength(8), required })
  private password = "";

  @Validate({ required, sameAsPassword: sameAs("password") })
  private passwordConfirmation = "";

  @Validate({ alphaNum, required })
  private username = "";

  private async register() {
    if (!this.validate()) return;

    const recaptcha = await this.$recaptcha("register");

    this.form.disable();
    this.submitButton.disable().load();

    await register({
      email: this.emailAddress,
      password: this.password,
      recaptcha,
      username: this.username
    })
      .then(() => this.form.success("Please check your email for account activation instructions!"))
      .catch(error => {
        this.form.error(error).enable();
        this.submitButton.enable();
      })
      .finally(() => this.submitButton.finish());
  }

  validate() {
    !this.$v.emailAddress.email
      ? this.emailInput.error("Please enter a valid email address!")
      : this.emailInput.hideErrorMessage();

    !this.$v.password.minLength
      ? this.passwordInput.error(`Passwords must be at least ${this.$v.password.$params.minLength.min} characters long!`) // prettier-ignore
      : this.passwordInput.hideErrorMessage();

    !this.$v.passwordConfirmation.sameAsPassword
      ? this.passwordConfirmationInput.error("Your passwords do not match, please try again!")
      : this.passwordConfirmationInput.hideErrorMessage();

    !this.$v.username.alphaNum
      ? this.usernameInput.error("Usernames can only contain alphanumerical characters!")
      : this.usernameInput.hideErrorMessage();

    return !this.$v.$invalid;
  }
}
</script>

<style lang="scss" scoped>
.register {
  @apply flex flex-col items-center;
  @apply w-full;

  &__card {
    @apply shadow-xl;
    @apply w-full;

    max-width: 500px;

    @screen sm_max {
      @apply px-5;
      @apply rounded-none;
      @apply shadow-none;
    }
  }

  &__footer {
    @apply flex flex-col justify-center;
    @apply font-medium text-center;
    @apply mt-8;

    font-size: 15px;

    & a {
      @apply text-primary-400;

      &:hover {
        @apply text-primary-600;
      }
    }
  }

  &__footer-text {
    @apply text-white;
  }

  &__form {
    @apply my-6;
  }

  &__recaptcha {
    @apply font-normal text-sm;
    @apply leading-relaxed;
  }

  &__subtitle {
    @apply font-medium text-center text-gray-800 text-lg;
  }

  &__title {
    @apply font-bold text-3xl text-center text-gray-900;
    @apply mb-4;
  }
}
</style>
