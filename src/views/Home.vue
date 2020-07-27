<template>
  <div class="home">
    <!--Jumbotron-->
    <div class="jumbotron my-5 mx-auto" style="max-width: 1000px;">
      <h1 class="display-5 text-success">Track your tools and tasks!</h1>
      <p
        class="lead"
      >A simple tool to track a day at work. Record tools, tasks, hours, and more on the go!</p>

      <ul>
        <li>Plan at home</li>
        <li>Track your progress at work on mobile</li>
        <li>Share an account between boss and workers for easy communication</li>
      </ul>

      <div class="row">
        <div class="col-sm-11 m-auto">
          <div class="embed-responsive embed-responsive-16by9 mb-3">
            <iframe
              width="1732"
              height="712"
              src="https://www.youtube.com/embed/ih-i5kAkeRw"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <p class="text-info">Sign up or sign in to start.</p>
      <hr />
      <router-link :to="{ name: 'SignIn' }" style="color: white;">
        <button class="btn btn-info shadow mr-1" id="sign-in">Sign In</button>
      </router-link>
      <router-link :to="{ name: 'SignUp' }" style="color: white;">
        <button class="btn btn-secondary shadow" id="sign-up">Sign Up</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase/init";
export default {
  name: "Home",
};
</script>

<style lang="scss">
$main-font: "Righteous", cursive;
.home {
  .jumbotron h1 h3 {
    font-family: $main-font;
  }
}
</style>