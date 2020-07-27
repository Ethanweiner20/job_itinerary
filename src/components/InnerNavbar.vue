<template>
  <div class="inner-navbar container col-12 m-auto px-sm-5" style="max-width: 1000px;">
    <!-- Workers Select -->
    <div
      class="select-worker p-3 rounded border border-success shadow-lg mt-4"
      style="border-bottom: none !important; margin-top: -3px;"
    >
      <h4 class="text-left" v-if="!(this.$route.name === 'ArchivesJob')">Select a Worker</h4>
      <select
        ref="workersSelect"
        class="custom-select my-2 workers-select"
        size="5"
        @change="changeWorker"
        v-if="!(this.$route.name === 'ArchivesJob')"
      >
        <option selected class="font-italic" disabled>Select worker or group</option>
        <option
          v-for="(worker, index) in workers"
          :key="index"
          class="text-success worker"
          :value="worker"
        >{{worker}}</option>
      </select>

      <button
        type="button"
        data-toggle="modal"
        data-target="#new-worker-modal"
        class="mr-1 my-1 new-worker btn d-inline text-white bg-success shadow"
        style="width: 275px;"
        v-if="!(this.$route.name==='Archives' || this.$route.name ==='ArchivesJob')"
      >+ New Worker/Group</button>
      <button
        type="button"
        data-toggle="modal"
        data-target="#delete-worker-modal"
        class="my-1 delete-worker btn btn-danger d-inline text-white shadow"
        style="width: 275px;"
        v-if="!(this.$route.name==='Archives' || this.$route.name ==='ArchivesJob')"
      >x Delete Selected Worker/Group</button>
    </div>
    <!-- Tabs -->

    <ul class="nav nav-pills nav-fill nav-justified bg-white shadow-lg">
      <li class="nav-item">
        <router-link :to="{name: 'Recent'}" style="text-decoration: none;">
          <a class="nav-link recent-link">Most Recent Job</a>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'Archives'}" style="text-decoration: none;">
          <a class="nav-link archives-link">Archives</a>
        </router-link>
      </li>
    </ul>
    <div class="modal fade" id="new-worker-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <form class="new-worker-form" @submit.prevent="addWorker">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Worker/Group</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Worker/Group Name"
                v-model="newWorker"
              />
              <div class="subtitle font-italic mt-2 text-info" style="font-size: 12px;">
                Add a single worker for tracking
                individual work/hours
              </div>
              <div class="subtitle font-italic text-info" style="font-size: 12px;">
                Add a group for tracking larger-scale
                activities
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Confirm</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="modal fade" id="delete-worker-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <form class="delete-worker-form" @submit.prevent="deleteWorker">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Delete Worker/Group:
                <span
                  id="deleted-worker"
                  class="font-italic text-danger"
                >{{ worker }}</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-danger">Delete</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { db, usersCollection } from "@/firebase/init";
export default {
  name: "InnerNavbar",
  data() {
    return {
      jobsCollection: null,
      newWorker: null,
      workers: [],
    };
  },
  methods: {
    ...mapMutations(["setWorker", "setJobData"]),
    changeWorker(e) {
      this.$store.commit("setWorker", e.target.value);
    },
    async addWorker() {
      await this.jobsCollection.add({
        worker: this.newWorker,
        created_at: new Date(),
        dates: [],
        additionalNotes: "",
        customer: "",
        images: [],
        location: "",
        startTime: "",
        tasks: [],
        tools: [],
      });
      $("#new-worker-modal").modal("toggle");
      this.newWorker = null;
    },
    async deleteWorker() {
      await this.jobsCollection
        .where("worker", "==", this.worker)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.jobsCollection.doc(doc.id).delete();
          });
        });
      this.workers = this.workers.filter((worker) => !(worker == this.worker));
      this.setWorker(null);
      this.setJobData({
        worker: this.worker,
        created_at: new Date(),
        dates: [],
        additionalNotes: "",
        customer: "",
        images: [],
        location: "",
        startTime: "",
        tasks: [],
        tools: [],
      });
      $("#delete-worker-modal").modal("toggle");
    },
    selectWorker() {
      if (!(this.$route.name === "ArchivesJob")) {
        const worker = localStorage.getItem("worker");
        const select = this.$refs.workersSelect;
        if (worker && select.children[0].selected === true) {
          select.children[0].selected = false;
          select.querySelector(`option[value="${worker}"]`).selected = true;
          select.dispatchEvent(new Event("change"));
        }
      }
    },
  },
  async created() {
    let selected = false;
    if (this.$route.name === "ArchivesJob" && this.user) {
      usersCollection
        .doc(this.user.uid)
        .collection("jobs")
        .doc(this.$route.params.id)
        .get()
        .then((snapshot) => {
          this.$store.commit("setWorker", snapshot.data().worker);
        });
    }
    if (this.user) {
      this.jobsCollection = usersCollection
        .doc(this.user.uid)
        .collection("jobs");
      usersCollection
        .doc(this.user.uid)
        .collection("jobs")
        .orderBy("created_at", "desc")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const worker = change.doc.data().worker;
            if (change.type === "added") {
              if (!this.workers.includes(worker)) {
                this.workers.push(worker);
              }
            }
          });
          if (!selected) {
            setTimeout(() => {
              this.selectWorker();
            }, 0);
            selected = true;
          }
        });
    } else {
      workers = [];
    }
  },
  computed: {
    ...mapGetters(["user", "worker"]),
  },
};
</script>

<style lang="scss">
$main-font: "Righteous", cursive;

.inner-navbar {
  .nav {
    border: 1px solid #28a745;
    font-family: $main-font;
    border-radius: 0 0 20px 20px;
    a {
      font-size: 25px;
      @media (max-width: 500px) {
        font-size: 17px;
      }
    }
    .recent-link {
      border-radius: 0 0 20px 20px;
    }
    .archives-link {
      border-radius: 0 0 20px 20px;
    }
  }
  .nav-link {
    color: #28a745 !important;
    transition: 0.5s background-color ease;
    transition: 0.5s color ease;
  }
  .router-link-active {
    a {
      background: rgb(40, 167, 69);
      background: linear-gradient(
        0deg,
        rgb(25, 143, 53) 38%,
        rgb(47, 179, 76) 100%
      );
      border: 1px solid rgb(255, 255, 255);
      color: white !important;
    }
  }
  .select-worker {
    border-radius: 20px 20px 0 0 !important;
    h4 {
      font-family: $main-font;
    }
  }
  .modal {
    h5 {
      font-family: $main-font;
    }
  }
}
</style>