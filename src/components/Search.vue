<template>
  <form class="search-form" @submit.prevent="search">
    <div class="input-group mb-3">
      <input
        class="form-control"
        :type="searchType"
        placeholder="Search by Filter"
        aria-label="Search"
        v-model="input"
      />
      <div class="input-group-append">
        <select
          name="search-filter"
          ref="searchFilter"
          class="custom-select mr-1"
          @change="changeFilter"
        >
          <option selected disabled>Filter By</option>
          <option value="Don't Filter">Don't Filter</option>
          <option value="Customer">Customer</option>
          <option value="Date">Date</option>
          <option value="Location">Location</option>
        </select>
      </div>
      <button
        class="btn btn-outline-success shadow"
        style="border: 2px solid #28a745;"
        type="submit"
      >Filter</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchType: "text",
      filter: null,
      input: null,
    };
  },
  methods: {
    changeFilter(e) {
      this.filter = e.target.value;
      this.input = null;

      switch (e.target.value) {
        case "Customer":
          this.searchType = "text";
          break;
        case "Date":
          this.searchType = "date";
          break;
        case "Location":
          this.searchType = "text";
          break;
        case "Don't Filter" || "Filter By":
          this.searchType = "text";
          this.filter = null;
          this.search();
          break;
      }
    },
    search() {
      if (this.filter) {
        let filter, input;
        filter = this.filter.toLowerCase();
        if (!(filter == "date")) {
          input = this.input.toLowerCase();
        } else {
          input = this.input;
        }
        this.$emit("filter", { filter, input });
      } else {
        this.$emit("filter", { input: this.input });
      }
    },
  },
};
</script>

<style lang="scss">
.search-form {
  #search-filter {
    display: block !important;
  }
  .input-container input {
    border: none;
    box-sizing: border-box;
    outline: 0;
    padding: 0.75rem;
    position: relative;
    width: 100%;
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
}
</style>