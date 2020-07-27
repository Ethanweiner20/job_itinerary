<template>
  <div class="custom-navbar">
    <!--Navbar-->
    <nav class="navbar navbar-dark bg-success sticky-top">
      <router-link :to="{ name: 'Recent'}" class="navbar-brand">jobitinerary.com</router-link>
      <div class="dropdown">
        <button
          class="btn btn-info"
          :class="{ 'dropdown-toggle' : user}"
          type="button"
          id="account-status"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span v-if="user">{{ user.email }}</span>
          <span v-else>Not Signed In</span>
        </button>
        <div v-if="user" class="dropdown-menu" aria-labelledby="account-status">
          <a href="#" class="dropdown-item" id="sign-out-button" @click="signOut">Sign out</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { auth } from "@/firebase/init";
export default {
  name: "Navbar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.$router.push({ name: "Home" });
      });
      this.$store.commit("setWorker", null);
    },
  },
};
</script>

<style lang="scss">
$main-font: "Righteous", cursive;

.custom-navbar {
  nav {
    font-family: $main-font;
    .border {
      border-width: 5px !important;
    }
  }
}
</style>