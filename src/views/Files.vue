<template>
  <div class="files">
    <breadcrumb class="files__breadcrumb">
      <template #seperator>
        <font-awesome-icon
          class="files__breadcrumb-seperator"
          :icon="icons.chevronRight"
          size="xs"
        />
      </template>

      <breadcrumb-item
        v-for="(directory, idx) of path"
        :active="idx === path.length - 1"
        :key="directory"
      >
        <font-awesome-icon
          v-if="idx === 0"
          class="files__breadcrumb-cloud"
          :icon="icons.cloud"
          size="md"
        />

        <span>{{ directory }}</span>
      </breadcrumb-item>
    </breadcrumb>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronRight, faCloud } from "@fortawesome/free-solid-svg-icons";

import Breadcrumb from "@/components/Breadcrumb.vue";
import BreadcrumbItem from "@/components/BreadcrumbItem.vue";

@Component({
  components: {
    Breadcrumb,
    BreadcrumbItem,
    FontAwesomeIcon
  }
})
export default class Files extends Vue {
  private cwd = "/test/hello";

  private get icons() {
    return {
      chevronRight: faChevronRight,
      cloud: faCloud
    };
  }

  private get path() {
    const parts = this.cwd.split("/");

    parts[0] = this.$accessor.user.info?.displayName || "/"; // Root folder

    return parts;
  }
}
</script>

<style lang="scss" scoped>
.files {
  @apply h-full;
  @apply p-4;

  @screen sm_max {
    @apply p-3;
  }

  &__breadcrumb-cloud {
    @apply mr-2;

    margin-bottom: 2px;
  }

  &__breadcrumb-seperator {
    margin-bottom: 1px;
  }
}
</style>
