<template>
  <div class="task" style="margin-right: 15px;" ref="task">
    <div class="task-input-group input-group mt-2">
      <button type="button" class="close mr-1" aria-label="Close" @click="deleteTask">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input
            class="completed task-input"
            type="checkbox"
            aria-label="Checkbox for following text input"
            v-model="task.completed"
          />
        </div>
      </div>
      <textarea rows="1" class="form-control" placeholder="Task" v-model="task.name"></textarea>
      <div class="input-group-append">
        <svg
          class="ml-1 mt-1 move-task"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"
          />
        </svg>
      </div>
    </div>
    <div class="task-input-group input-group">
      <textarea
        class="task-notes ml-3 font-italic form-control"
        rows="1"
        name="notes"
        placeholder="Notes"
        v-model="task.notes"
        @keydown.tab.prevent="onTab"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Task",
  props: ["task", "index"],
  computed: mapGetters(["jobData"]),
  methods: {
    deleteTask(e) {
      this.jobData.tasks.splice(this.index, 1);
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
$tasks-color: rgb(0, 107, 93);

.task {
  color: $tasks-color;
  input,
  select,
  textarea {
    border: 1px solid $tasks-color;
    &:focus {
      border: 2px solid darken($tasks-color, 3);
    }
  }
  textarea {
    margin-bottom: -1px !important;
  }
  svg {
    cursor: move;
  }
  .hold {
    cursor: move;
  }
}
</style>