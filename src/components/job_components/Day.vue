<template>
  <div class="date bg-light rounded border border-muted p-3 mb-2">
    <button @click.prevent="deleteDate" type="button" class="close mr-1" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <div class="form-row">
      <div class="form-group col-12 col-md-4">
        <label for="date">Date</label>
        <input v-model="date.date" type="date" class="form-control date-input" />
      </div>

      <div class="form-group col-6 col-md-4">
        <label for="hours">Start Time</label>
        <input v-model="date.startTime" type="text" class="form-control" placeholder="Start Time" />
      </div>
      <div class="form-group col-6 col-md-4">
        <label for="hours">Hours</label>
        <input
          v-model="date.hours"
          type="text"
          class="form-control"
          placeholder="Hours for day"
          @keydown.tab.prevent="onTab"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Day",
  props: ["date", "index"],
  computed: mapGetters(["jobData"]),
  methods: {
    deleteDate(e) {
      this.jobData.dates.splice(this.index, 1);
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
</style>