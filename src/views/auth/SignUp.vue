<template>
  <div class="sign-up jumbotron px-5 py-4">
    <h1 class="text-dark text-center">Sign Up</h1>
    <form id="sign-up-form" @submit.prevent="signUp">
      <div class="form-group">
        <label class="text-secondary" for="email">Email address</label>
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
        <label class="text-secondary" for="password">Password</label>
        <input
          type="password"
          class="form-control"
          name="password"
          placeholder="Password"
          v-model="password"
        />
        <p class="text-danger mt-3" v-if="feedback">{{ feedback }}</p>
      </div>
      <button type="submit" class="btn text-secondary btn-white border-secondary shadow">Sign Up</button>
    </form>
  </div>
</template>

<script>
import { db, auth, usersCollection } from "@/firebase/init";
export default {
  name: "SignUp",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    signUp() {
      const passwordRegex = /^^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if (this.email && this.password && passwordRegex.test(this.password)) {
        this.feedback = null;
        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            usersCollection.doc(cred.user.uid).set({
              email: user.email
            });
            this.$router.push({ name: "Recent" });
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.feedback =
          "Please enter a valid email & password. Password must be at least 8 characters & contain uppercase letter, a number, a symbol.";
      }
    }
  }
};
</script>

<style lang="scss">
$main-font: "Righteous", cursive;

.sign-up {
  h1 {
    font-family: $main-font;
  }
  max-width: 600px;
  margin: 50px auto;
}
</style>