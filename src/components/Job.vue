<template>
  <div
    class="job col-12 m-auto px-sm-5"
    style="max-width: 1000px;"
    v-if="this.worker"
    @input="expandOnInput"
  >
    <button
      class="mt-3 btn btn-warning d-inline shadow"
      style="border: 3px solid orange !important;"
      v-if="this.$route.name === 'ArchivesJob'"
      @click="goToArchives"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
      Go Back to Archives
    </button>
    <form
      class="mt-4 mb-5 px-4 rounded shadow-lg border border-primary"
      id="job-form"
      @input="onInput"
    >
      <p
        v-if="this.$route.path === '/recent'"
        class="recent-job-info mt-2 mb-0 text-left text-dark font-weight-bold"
        style="font-size: 12px;"
      >
        Most recent job is shown. Click
        <span class="text-success">Start a New Job</span>
        to add a new one.
      </p>

      <p
        class="mt-2 mb-2 text-left font-italic text-info"
        style="font-size: 15px;"
      >Changes save automatically</p>
      <h3 class="recent-job-heading text-left d-inline">
        Job for
        <strong class="current-worker" style="text-decoration: underline;">{{ this.worker }}</strong>
      </h3>
      <button
        id="new-job-button"
        class="mt-2 btn btn-block btn-success d-block shadow"
        style="border: 3px solid rgb(109, 216, 114) !important;"
        @click.prevent="addJob"
        v-if="this.$route.path === '/recent'"
      >+ Start a New Job</button>
      <div
        ref="alert"
        class="alert alert-success mt-2 fade show d-none"
        role="alert"
      >New Job Started!</div>

      <hr />
      <!--Main Inputs-->
      <div class="main-inputs" v-if="jobData">
        <div class="form-row">
          <!--Dates Input-->
          <div class="form-group dates-form col-12">
            <label for="dates" class="font-weight-bold">Dates</label>
            <Day
              v-for="(date, index) in jobData.dates"
              :key="index"
              :date="date"
              :index="index"
              @tab="onDateTab"
            />
          </div>

          <div class="mb-3 col-12" style="margin-top: -10px;">
            <button
              type="button"
              class="btn btn-sm date-button d-inline text-white"
              @click="addDate"
            >+ New Date</button>
            <p class="text-muted font-italic d-inline ml-2">or press TAB</p>
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="customer" class="font-weight-bold">Customer</label>
            <input
              type="text"
              id="customer"
              class="form-control"
              placeholder="Customer"
              v-model="jobData.customer"
            />
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="job-location" class="font-weight-bold">Job Location</label>
            <input
              type="text"
              class="form-control"
              id="location"
              placeholder="Location"
              v-model="jobData.location"
            />
          </div>
        </div>

        <!--Tools Input-->
        <div class="form-group tools-form">
          <label for="tools" class="font-weight-bold">Tools</label>
          <Tool
            v-for="(tool, index) in jobData.tools"
            :key="index"
            :tool="tool"
            :index="index"
            @tab="onToolTab"
          />
        </div>

        <div class="mb-3">
          <button
            type="button"
            class="btn btn-sm tools-button d-inline text-white"
            @click="addTool"
          >+ New Tool</button>
          <p class="text-muted font-italic d-inline ml-2">or press TAB</p>
        </div>

        <!--Tasks Input-->
        <div class="form-group tasks-form">
          <label for="tasks" class="font-weight-bold d-inline">Tasks</label>
          <p
            style="font-size: 13px; margin-top: -7px"
            class="text-dark font-italic text-right d-inline ml-2"
          >
            Reorder tasks by dragging the
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"
                />
              </svg>
            </span>
          </p>
          <draggable v-model="jobData.tasks" group="tasks" @end="onDragEnd">
            <Task
              v-for="(task, index) in jobData.tasks"
              :key="index"
              :task="task"
              :index="index"
              @tab="onTaskTab"
            />
          </draggable>
        </div>

        <div class="mb-3">
          <button
            type="button"
            class="btn btn-sm tasks-button d-inline text-white"
            @click="addTask"
          >+ New Task</button>
          <p class="text-muted font-italic d-inline ml-2">or press TAB</p>
        </div>

        <div class="form-group">
          <label for="additional-notes" class="font-weight-bold">Additional Notes</label>
          <textarea
            class="form-control"
            rows="1"
            name="additionalNotes"
            placeholder="Notes"
            v-model="jobData.additionalNotes"
          ></textarea>
        </div>
        <div class="form-group images-form">
          <label for="images" class="images-label font-weight-bold">Images</label>
          <div class="images-container">
            <Img
              v-for="(image, index) in jobData.images"
              :key="index"
              :image="image"
              :index="index"
            />
          </div>
          <button
            type="button"
            class="mt-2 btn btn-sm images-button d-inline text-white"
            @click="addImage"
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
          <form class="delete-worker-form" @submit.prevent="resetData">
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
          <form class="delete-worker-form" @submit.prevent="deleteData">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Are you sure you want to delete this job?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <p class="text-danger mt-3 ml-3" v-if="deleteFeedback">{{ deleteFeedback }}</p>
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
import { mapGetters, mapActions, mapMutations } from "vuex";
import { debounce } from "debounce";
import { db } from "@/firebase/init";
import draggable from "vuedraggable";

import Day from "./job_components/Day";
import Tool from "./job_components/Tool";
import Task from "./job_components/Task";
import Img from "./job_components/Img";
import expand from "../mixins";
export default {
  name: "Job",
  mixins: [expand],
  components: {
    Tool,
    Task,
    Img,
    Day,
    draggable,
  },
  props: ["identifier"],
  data() {
    return {
      fromIndex: null,
      toIndex: null,
      deleteFeedback: null,
    };
  },
  computed: mapGetters(["jobData", "worker", "user", "id", "jobsCollection"]),
  methods: {
    ...mapActions(["getJobData"]),
    ...mapMutations(["setJobData"]),
    addJob() {
      this.jobsCollection
        .add({
          worker: this.worker,
          created_at: new Date(),
          dates: [],
          additionalNotes: "",
          customer: "",
          images: [],
          location: "",
          tasks: [],
          tools: [],
        })
        .then(() => {
          this.getJobData({ worker: this.worker });
          this.$refs.alert.classList.remove("d-none");
          setTimeout(() => {
            this.$refs.alert.classList.add("d-none");
          }, 2000);
        });
    },
    async updateFirestore() {
      await db
        .collection("users")
        .doc(this.user.uid)
        .collection("jobs")
        .doc(this.id)
        .set(this.jobData);
    },
    debouncedUpdateFirestore: debounce(function () {
      this.updateFirestore();
    }, 500),
    onInput() {
      this.debouncedUpdateFirestore();
    },
    addDate() {
      this.jobData.dates.push({ date: this.formatDate(new Date()) });
    },
    onDateTab(data) {
      if (this.jobData.dates.length == data.index + 1) {
        this.addDate();
      }
      document.querySelectorAll(".date-input").forEach((element, index) => {
        if (index === data.index + 1) {
          element.focus();
        }
      });
    },
    addTool() {
      this.jobData.tools.push({});
    },
    onToolTab(data) {
      if (this.jobData.tools.length == data.index + 1) {
        this.addTool();
      }
      document.querySelectorAll(".tool-input").forEach((element, index) => {
        if (index === data.index + 1) {
          element.focus();
        }
      });
    },
    addTask() {
      this.jobData.tasks.push({});
    },
    onTaskTab(data) {
      if (this.jobData.tasks.length == data.index + 1) {
        this.addTask();
      }
      document.querySelectorAll(".task-input").forEach((element, index) => {
        if (index === data.index + 1) {
          element.focus();
        }
      });
    },
    addImage() {
      this.jobData.images.push({});
    },
    formatDate(d) {
      var month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    onDragEnd(e) {
      const event = document.createEvent("HTMLEvents");
      event.initEvent("input", true, true);
      e.item.dispatchEvent(event);
    },
    resetData() {
      this.setJobData({
        worker: this.worker,
        created_at: new Date(),
        dates: [],
        additionalNotes: "",
        customer: "",
        images: [],
        location: "",
        tasks: [],
        tools: [],
      });
      $("#reset-job-modal").modal("toggle");
    },
    async deleteData() {
      this.deleteFeedback = null;
      let error = false;
      await db
        .collection("users")
        .doc(this.user.uid)
        .collection("jobs")
        .doc(this.id)
        .delete();
      this.getJobData({ worker: this.worker })
        .catch((err) => {
          this.deleteFeedback = err.message;
          this.error = true;
        })
        .then(() => {
          if (!this.error) {
            $("#delete-job-modal").modal("toggle");
          }
        });
    },
    goToArchives() {
      this.$router.push({ name: "Archives" });
    },
  },
  created() {
    this.getJobData({ worker: this.worker, id: this.identifier }).then(() => {
      this.expandTextAreas();
    });
    this.$store.watch(
      (state, getters) => getters.worker,
      (worker) => {
        console.log(this.identifier);
        this.getJobData({ worker: this.worker, id: this.identifier }).then(
          () => {
            this.expandTextAreas();
          }
        );
      }
    );
  },
};
</script>

<style lang="scss">
$tools-color: rgb(146, 107, 35);
$tasks-color: rgb(0, 107, 93);
$dates-color: gray;
.job {
  .form-check {
    font-size: 12px;
  }
  .tools-button {
    background-color: $tools-color;
    &:hover {
      background-color: darken($tools-color, 5);
    }
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

  .date-button {
    background-color: $dates-color;
    &:hover {
      background-color: darken($dates-color, 8);
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