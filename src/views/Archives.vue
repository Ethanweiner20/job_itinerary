<template>
  <div class="archives">
    <div class="list-group col-12 m-auto px-sm-5 pl-3 pt-3" style="max-width: 1000px;">
      <Search @filter="filterArchives" />

      <Archive v-for="(archive, index) in filteredArchives" :key="index" :archive="archive" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Archive from "@/components/Archive";
import Search from "@/components/Search";
import { auth, usersCollection } from "@/firebase/init";

export default {
  name: "Archives",
  components: {
    Archive,
    Search,
  },
  data() {
    return {
      archives: [],
      filteredArchives: [],
    };
  },
  methods: {
    getArchives() {
      usersCollection
        .doc(auth.currentUser.uid)
        .collection("jobs")
        .where("worker", "==", this.worker)
        .orderBy("created_at", "desc")
        .onSnapshot((snapshot) => {
          this.archives = [];
          snapshot.docs.forEach((doc) => {
            this.archives.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          this.filteredArchives = this.archives;
        });
    },
    filterArchives(data) {
      if (data.filter) {
        this.filteredArchives = this.archives.filter((archive) => {
          if (data.filter === "date") {
            return archive.data.dates.find((date) => date.date == data.input);
          } else {
            return archive.data[data.filter].toLowerCase().match(data.input);
          }
        });
      } else {
        this.filteredArchives = this.archives;
      }
    },
  },
  created() {
    this.getArchives();
    this.$store.watch(
      (state, getters) => getters.worker,
      (worker) => {
        this.getArchives();
      }
    );
  },
  computed: mapGetters(["user", "worker"]),
};
</script>

<style>
</style>