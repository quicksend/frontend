<template>
  <div id="layout-default">
    <activity-bar>
      <template #pinned>
        <activity-bar-item>
          <logo :hideBrandName="true" :size="36" />
        </activity-bar-item>
      </template>

      <template #start>
        <activity-bar-item name="Files" to="files">
          <font-awesome-icon size="lg" :icon="icons.copy" />
        </activity-bar-item>

        <activity-bar-item name="Stream" to="stream">
          <font-awesome-icon size="lg" :icon="icons.stream" />
        </activity-bar-item>
      </template>

      <template #end>
        <activity-bar-item name="User" to="@me">
          <font-awesome-icon size="lg" :icon="icons.astronaut" />
        </activity-bar-item>

        <activity-bar-item name="Settings" to="settings">
          <font-awesome-icon size="lg" :icon="icons.wrench" />
        </activity-bar-item>
      </template>
    </activity-bar>

    <main id="layout-default__content">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCopy, faStream, faUserAstronaut, faWrench } from "@fortawesome/free-solid-svg-icons";

import ActivityBar from "@/components/ActivityBar.vue";
import ActivityBarItem from "@/components/ActivityBarItem.vue";
import Logo from "@/components/Logo.vue";

@Component({
  components: {
    ActivityBar,
    ActivityBarItem,
    FontAwesomeIcon,
    Logo
  }
})
export default class DefaultLayout extends Vue {
  get icons() {
    return {
      astronaut: faUserAstronaut,
      copy: faCopy,
      stream: faStream,
      wrench: faWrench
    };
  }
}
</script>

<style lang="scss" scoped>
#layout-default {
  @apply h-full;
  @apply overflow-auto;

  background-color: #f6f9fc;

  &__content {
    @apply h-full;
  }
}
</style>
