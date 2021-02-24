<template>
  <div>
    <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <div class=" navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="isUserLoggedIn">
              <router-link class="nav-link" to="/dashboard"
                >Dashboard</router-link
              >
            </li>
            <li class="nav-item" v-if="!isUserLoggedIn">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="!isUserLoggedIn">
              <router-link class="nav-link" to="/register"
                >Register</router-link
              >
            </li>
            <li class="nav-item" v-if="isUserLoggedIn">
              <router-link
                class="nav-link"
                to="/dashboard"
                @click.native="handleLogout"
                >Logout</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav> -->

    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <button
        type="button"
        class="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/dashboard" v-if="isUserLoggedIn"
            >Dashboard</router-link
          >
          <router-link class="nav-link" to="/login" v-if="!isUserLoggedIn"
            >Login</router-link
          >
          <router-link class="nav-link" to="/register" v-if="!isUserLoggedIn"
            >Register</router-link
          >
          <router-link
            class="nav-link"
            to="/dashboard"
            @click.native="handleLogout"
            v-if="isUserLoggedIn"
            >Logout</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["isUserLoggedIn"],
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
