<!-- https://forum.vuejs.org/t/loop-with-v-for-slots-default/20646/8 -->

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default Vue.component("wrapper-node", {
  props: {
    node: {
      required: true,
      type: Object
    },
    options: {
      default: () => undefined,
      type: Object
    },
    tag: {
      default: "div",
      type: String
    }
  },
  render: function(h) {
    return h(this.tag, this.options, [this.node]);
  }
});
</script>
