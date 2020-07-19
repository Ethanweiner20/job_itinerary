<template>
  <div id="app">
    <Navbar />
    <InnerNavbar v-if="user" />

    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import InnerNavbar from "./components/InnerNavbar";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
    InnerNavbar
  },
  created() {
    this.listenToAuth();
  },
  methods: {
    ...mapActions(["listenToAuth"])
  },
  computed: mapGetters(["user"])
};
</script>

<style lang="scss">
$main-font: "Righteous", cursive;
.main-font {
  font-family: $main-font;
}
button {
  font-family: $main-font;
}
</style>
