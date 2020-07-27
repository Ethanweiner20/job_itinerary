<template>
  <div class="archive" v-if="archive.data.dates[0] || archive.data.customer" @click="goToArchive">
    <a href="#" class="data-link list-group-item list-group-item-action">
      <button
        type="button"
        class="exit close mr-1 d-inline-block"
        aria-label="Close"
        @click.prevent="deleteArchive"
      >
        <span class="exit" aria-hidden="true">&times;</span>
      </button>
      <ul class="data-link list-unstyled">
        <li class="data-link text-secondary d-block">
          Customer:
          <span class="data-link text-dark">{{ archive.data.customer }}</span>
        </li>
        <li class="data-link text-secondary d-block">
          Date(s):
          <div class="mt-1 p-2 dates border">
            <div v-for="(date, index) in archive.data.dates" :key="index">
              <h6 class="data-link mb-0 text-dark d-inline">{{date.date}}</h6>
              <span v-if="date.hours" class="text-dark mx-1">|</span>
              <span v-if="date.hours" class="text-secondary d-inline">
                Hours:
                <span class="data-link text-dark">{{date.hours}}</span>
              </span>
            </div>
          </div>
        </li>
      </ul>
      <p class="data-link text-primary font-italic">Click to reveal details</p>
    </a>
  </div>
</template>

<script>
import { usersCollection } from "@/firebase/init";
import { mapGetters } from "vuex";
export default {
  name: "Archive",
  props: ["archive"],
  methods: {
    goToArchive() {
      this.$router.push({
        name: "ArchivesJob",
        params: { id: this.archive.id },
      });
    },
    deleteArchive(e) {
      e.stopPropagation();
      usersCollection
        .doc(this.user.uid)
        .collection("jobs")
        .doc(this.archive.id)
        .delete();
    },
  },
  computed: mapGetters(["user"]),
};
</script>

<style lang="scss">
.archive {
  .dates {
    border-radius: 20px;
  }
}
</style>