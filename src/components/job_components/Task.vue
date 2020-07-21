<template>
  <div class="task">
    <div class="task-input-group input-group mt-2">
      <button type="button" class="close mr-1" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input
            class="completed"
            type="checkbox"
            aria-label="Checkbox for following text input"
            v-model="task.completed"
          />
        </div>
      </div>
      <textarea id="task" rows="1" class="form-control" placeholder="Task" v-model="task.name"></textarea>
    </div>
    <textarea
      class="task-notes form-control ml-3 font-italic"
      rows="1"
      name="notes"
      placeholder="Notes"
      v-model="task.notes"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["task"]
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
}
</style>