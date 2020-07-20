<template>
  <div class="job col-12 m-auto px-sm-5" style="max-width: 1000px;">
    <form class="mt-4 mb-5 px-4 rounded shadow-lg border border-primary" id="job-form">
      <p
        class="recent-job-info mt-2 mb-0 text-left text-dark font-weight-bold"
        style="font-size: 12px;"
      >
        Most recent job is shown. Click
        <span class="text-success">New Job</span>
        to add a new one.
      </p>
      <p
        class="mt-2 mb-2 text-left font-italic text-info"
        style="font-size: 15px;"
      >Changes save automatically</p>
      <h3 class="recent-job-heading text-left d-inline">
        Job for
        <strong class="current-worker" style="text-decoration: underline;"></strong>
      </h3>
      <button
        id="new-job-button"
        class="mx-sm-3 mt-2 mt-sm-0 btn btn-success d-inline shadow"
        style="border: 3px solid rgb(109, 216, 114) !important;"
      >+ Start a New Job</button>
      <div
        class="alert alert-success mt-2 fade show"
        style="display: none;"
        role="alert"
      >New Job Started!</div>

      <hr />
      <!--Main Inputs-->
      <div class="main-inputs">
        <div class="form-row">
          <div class="form-group col-12 col-sm-6 col-lg-6">
            <label for="customer" class="font-weight-bold">Customer</label>
            <input
              type="text"
              id="customer"
              class="form-control"
              placeholder="Customer"
              v-model="customer"
            />
          </div>
          <div class="form-group col-12 col-sm-6 col-lg-6">
            <label for="date" class="font-weight-bold">Date</label>
            <input type="date" class="form-control" id="date" v-model="date" />
          </div>
          <div class="form-group col-12 col-sm-12 col-lg-4">
            <label for="job-location" class="font-weight-bold">Job Location</label>
            <input
              type="text"
              class="form-control"
              id="location"
              placeholder="Location"
              v-model="location"
            />
          </div>
          <div class="form-group col-12 col-sm-6 col-lg-4">
            <label for="hours" class="font-weight-bold">Start Time</label>
            <input
              type="text"
              class="form-control"
              id="time"
              placeholder="Start Time"
              v-model="startTime"
            />
          </div>
          <div class="form-group col-12 col-sm-6 col-lg-4">
            <label for="hours" class="font-weight-bold">End Time / Hours</label>
            <input
              type="text"
              class="form-control"
              id="hours"
              placeholder="End Time / Hours"
              v-model="hours"
            />
          </div>
        </div>

        <!--Tools Input-->
        <div class="form-group tools-form">
          <label for="tools" class="font-weight-bold">Tools</label>
          <div v-for="(tool, index) in tools" :key="index"></div>
        </div>

        <div class="mb-3">
          <button type="button" class="btn btn-sm tools-button d-inline text-white">+ New Tool</button>
          <p class="text-muted font-italic d-inline ml-2">or press TAB</p>
        </div>

        <!--Tasks Input-->
        <div class="form-group tasks-form">
          <label for="tasks" class="font-weight-bold">Tasks</label>
          <div v-for="(task, index) in tasks" :key="index"></div>
        </div>

        <div class="mb-3">
          <button type="button" class="btn btn-sm tasks-button d-inline text-white">+ New Task</button>
          <p class="text-muted font-italic d-inline ml-2">or press TAB</p>
        </div>

        <div class="form-group">
          <label for="additional-notes" class="font-weight-bold">Additional Notes</label>
          <textarea class="form-control" rows="1" name="additionalNotes" placeholder="Notes"></textarea>
        </div>
        <div class="form-group images-form">
          <label for="images" class="images-label font-weight-bold">Images</label>
          <div class="images-container"></div>
          <button
            type="button"
            class="mt-2 btn btn-sm images-button d-inline text-white"
          >+ New Image</button>
        </div>
      </div>

      <button
        type="button"
        data-toggle="modal"
        data-target="#reset-job-modal"
        class="mb-2 btn btn-warning btn-block text-white"
      >Reset</button>
      <button
        type="button"
        data-toggle="modal"
        data-target="#delete-job-modal"
        class="mb-2 btn btn-danger btn-block text-white"
      >Delete Job</button>

      <div class="modal fade" id="reset-job-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <form class="delete-worker-form">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Are you sure you want to reset?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-warning" id="reset-form">Reset</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="modal fade" id="delete-job-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <form class="delete-worker-form">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Are you sure you want to delete this job?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-danger" id="delete-job">Delete Job</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Job",
  data() {
    return {
      additionalNotes: "",
      customer: "",
      date: new Date(),
      hours: "",
      images: [],
      location: "",
      startTime: "",
      tasks: [],
      tools: [],
      worker: null
    };
  }
};
</script>

<style lang="scss">
$tools-color: rgb(146, 107, 35);
$tasks-color: rgb(0, 107, 93);
.job {
  .form-check {
    font-size: 12px;
  }

  .tools-form {
    color: $tools-color;
    input,
    select {
      border: 1px solid $tools-color;
      &:focus {
        border: 2px solid darken($tools-color, 3);
      }
    }
  }

  select {
    border-radius: 0px 5px 5px 0px !important;
  }

  .tools-button {
    background-color: $tools-color;
    &:hover {
      background-color: darken($tools-color, 5);
    }
  }

  textarea {
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
  }

  .tasks-form {
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

  .tasks-button {
    background-color: $tasks-color;
    &:hover {
      background-color: darken($tasks-color, 5);
    }
  }

  @media (max-width: 576px) {
    .tools-form select {
      display: none !important;
    }
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

  .image-preview__image,
  .image-notes {
    @media (min-width: 768px) {
      max-width: 500px;
    }
  }

  .file-input {
    font-family: arial;
  }

  .images-button {
    background-color: rgb(103, 38, 156);
  }

  .images-label {
    color: rgb(103, 38, 156);
  }

  .alert-success {
    transition: 1s opacity ease !important;
  }
}
</style>