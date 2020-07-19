<template>
  <div class="sign-in jumbotron px-5 py-4">
    <h1 class="text-info text-center">Sign In</h1>
    <form id="sign-in-form" @submit.prevent="signIn">
      <div class="form-group">
        <label class="text-info" for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label class="text-info" for="password">Password</label>
        <input
          type="password"
          class="form-control"
          name="password"
          placeholder="Password"
          v-model="password"
        />
        <p class="text-danger mt-3" v-if="feedback">{{ feedback }}</p>
      </div>
      <button type="submit" class="btn btn-white text-info border-info shadow">Sign In</button>
    </form>
  </div>
</template>

<script>
import { auth } from "@/firebase/init";
export default {
  name: "SignIn",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    signIn() {
      if (this.email && this.password) {
        this.feedback = null;
        auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({ name: "Recent" });
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "Please enter an email & password";
      }
    }
  }
};
</script>

<style lang="scss">
$main-font: "Righteous", cursive;

.sign-in {
  h1 {
    font-family: $main-font;
  }
  max-width: 600px;
  margin: 50px auto;
}
</style>