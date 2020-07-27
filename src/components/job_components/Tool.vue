<template>
  <div class="tool tool-input-group input-group my-1">
    <button type="button" class="close mr-1" aria-label="Close" @click="deleteTool">
      <span aria-hidden="true">&times;</span>
    </button>
    <input
      type="text"
      class="form-control tool-input"
      placeholder="Enter a tool"
      v-model="tool.name"
      @keydown.tab.prevent="onTab"
    />

    <div style="margin-left: -11px;">
      <div class="row">
        <div class="col-12">
          <div class="form-check">
            <input type="checkbox" class="out-to-job mr-1" :id="checkbox1" v-model="tool.outToJob" />
            <label class="form-check-label text-danger" :for="checkbox1">Out to Job</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-check">
            <input
              type="checkbox"
              class="back-to-shop mr-1"
              :id="checkbox2"
              v-model="tool.backToShop"
            />
            <label class="form-check-label text-success" :for="checkbox2">Back to Shop</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Tool",
  props: ["tool", "index"],
  computed: mapGetters(["jobData"]),
  data() {
    return {
      checkbox1: "checkbox1" + this.index,
      checkbox2: "checkbox2" + this.index,
    };
  },
  methods: {
    deleteTool(e) {
      this.jobData.tools.splice(this.index, 1);
      const event = document.createEvent("HTMLEvents");
      event.initEvent("input", true, true);
      e.target.dispatchEvent(event);
    },
    onTab(e) {
      this.$emit("tab", { index: this.index });
    },
  },
};
</script>

<style lang="scss">
$tools-color: rgb(146, 107, 35);

.tool {
  color: $tools-color;
  input {
    border: 1px solid $tools-color;
    &:focus {
      border: 2px solid darken($tools-color, 3);
    }
  }
}
</style>