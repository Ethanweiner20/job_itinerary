<template>
  <div class="inner-navbar container col-12 m-auto px-sm-5" style="max-width: 1000px;">
    <ul class="nav nav-pills nav-fill nav-justify mt-4">
      <li class="nav-item">
        <router-link :to="{name: 'Recent'}" style="text-decoration: none;">
          <a class="nav-link">Most Recent Job</a>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'Archives'}" style="text-decoration: none;">
          <a class="nav-link">Archives</a>
        </router-link>
      </li>
    </ul>
    <!-- Add workers Navbar v-if $route name is "Recent" -->
  </div>
</template>

<script>
export default {
  name: "InnerNavbar"
};
</script>

<style lang="scss">
$main-font: "Righteous", cursive;

.inner-navbar {
  font-family: $main-font;
  .nav {
    border: 1px solid #28a745;
    border-radius: 5px;
  }
  .nav-link {
    color: #28a745 !important;
    transition: 0.5s background-color ease;
    transition: 0.5s color ease;
  }
  .router-link-active {
    a {
      background-color: #28a745 !important;
      color: white !important;
    }
  }
}
</style>