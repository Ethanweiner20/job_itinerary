<template>
  <div class="tool tool-input-group input-group my-1">
    <button type="button" class="close mr-1" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <input type="text" class="form-control" placeholder="Enter a tool" v-model="tool.name" />
    <div class="input-group-append">
      <select name="Select Tool" id="tool-select" class="custom-select">
        <option selected>OR Choose</option>
      </select>
    </div>
    <div>
      <div class="row">
        <div class="col-12">
          <div class="form-check">
            <input type="checkbox" class="out-to-job" id="checkbox1" v-model="tool.outToJob" />
            <label class="form-check-label text-danger" for="checkbox1">Out to Job</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-check">
            <input type="checkbox" class="back-to-shop" id="checkbox2" v-model="tool.backToShop" />
            <label class="form-check-label text-success" for="checkbox2">Back to Shop</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tool",
  props: ["tool"]
};
</script>

<style lang="scss">
$tools-color: rgb(146, 107, 35);

.tool {
  color: $tools-color;
  input,
  select {
    border: 1px solid $tools-color;
    &:focus {
      border: 2px solid darken($tools-color, 3);
    }
  }
}
</style>