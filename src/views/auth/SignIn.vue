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
    <div class="mt-2">
      <a
        class="text-primary forgot-password-link"
        data-toggle="modal"
        data-target="#forgotPasswordModal"
      >Forgot password?</a>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="forgotPasswordModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="forgotPasswordModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="forgotPasswordModalLabel">Reset Password</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="resetPassword">
              <label for="email" class="text-info">Email</label>
              <input
                class="form-control"
                type="text"
                placeholder="Your email address"
                id="email"
                v-model="resetEmail"
              />
              <button type="submit" class="mt-2 btn btn-info form-control">Send Password Reset Email</button>
            </form>
            <p v-if="errorMsg" class="text-danger mt-2 text-center">{{errorMsg}}</p>

            <p
              v-if="success"
              class="text-success mt-2 text-center"
            >Password reset email has been sent</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
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
      feedback: null,
      resetEmail: null,
      errorMsg: null,
      success: false,
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
          .catch((err) => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "Please enter an email & password";
      }
    },
    async resetPassword() {
      this.success = false;
      this.errorMsg = null;
      try {
        await auth.sendPasswordResetEmail(this.resetEmail);
        this.success = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
};
</script>

<style lang="scss">
$main-font: "Righteous", cursive;

.sign-in {
  h1 {
    font-family: $main-font;
  }
  .forgot-password-link {
    cursor: pointer;
  }
  max-width: 600px;
  margin: 50px auto;
}
</style>