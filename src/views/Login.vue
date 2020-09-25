<template>
  <div class="login">
    <card class="login__card">
      <h1 class="login__title">Sign In</h1>
      <h2 class="login__subtitle">Log in to access and manage your files</h2>

      <v-form ref="form" class="login__form" @submit="login">
        <v-input
          autocomplete="username"
          autofocus
          label="Username"
          name="username"
          v-model.lazy.trim="username"
        />

        <v-input
          autocomplete="current-password"
          label="Password"
          name="password"
          type="password"
          v-model.lazy.trim="password"
        />

        <checkbox ref="rememberMe" label="Remember Me" name="remember-me" />

        <v-button ref="submitButton" :disabled="$v.$invalid" type="submit">
          Login
        </v-button>
      </v-form>

      <p class="login__recaptcha">
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a>
        apply.
      </p>
    </card>

    <div class="login__footer">
      <span>
        <span class="login__footer-text">Don't have an account yet? </span>
        <router-link to="register">Sign Up</router-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";

import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

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
export default class Login extends Vue {
  @Ref() private readonly form!: VForm;
  @Ref() private readonly rememberMe!: Checkbox;
  @Ref() private readonly submitButton!: VButton;

  @Validate({ required }) private password = "";
  @Validate({ required }) private username = "";

  private async login() {
    const recaptcha = await this.$recaptcha("login");

    this.form.disable();
    this.submitButton.disable().load();

    this.$accessor.user
      .login({
        recaptcha,
        rememberMe: this.rememberMe.value,
        password: this.password,
        username: this.username
      })
      .then(() => {
        this.form.hideErrorMessage();
        this.$router.push({ name: "files" });
      })
      .catch(error => {
        this.form.error(error).enable();
        this.submitButton.finish().enable();
      });
  }
}
</script>

<style lang="scss" scoped>
.login {
  @apply flex flex-col items-center;
  @apply w-full;

  &__card {
    @apply shadow-xl;
    @apply w-full;

    max-width: 450px;

    @screen sm_max {
      @apply px-5;
      @apply rounded-none;
      @apply shadow-none;
    }
  }

  &__footer {
    @apply flex justify-center;
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
