<template>
  <div id="app">
    <Header></Header>
    <div class="container">
      <router-view></router-view>
    </div>
    <div class="custom-control custom-switch">
      <input
        type="checkbox"
        class="custom-control-input"
        id="customSwitch1"
        checked=""
        @click="darkThemeSwitch"
      />
      <label class="custom-control-label title-dark" for="customSwitch1"
        >Dark Mode</label
      >
    </div>
  </div>
</template>

<style>
.custom-switch {
  position: fixed !important;
  bottom: 0px !important;
  right: 0px !important;
}
</style>

<script>
import Header from "./components/includes/Header.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Header,
  },
  methods: {
    _addDarkTheme() {
      let darkThemeLinkEl = document.createElement("link");
      darkThemeLinkEl.setAttribute("rel", "stylesheet");
      darkThemeLinkEl.setAttribute("href", "/css/darktheme.css");
      darkThemeLinkEl.setAttribute("id", "dark-theme-style");

      let docHead = document.querySelector("head");
      docHead.append(darkThemeLinkEl);
    },
    _removeDarkTheme() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      let parentNode = darkThemeLinkEl.parentNode;
      parentNode.removeChild(darkThemeLinkEl);
    },
    darkThemeSwitch() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      console.log("aaaaa", darkThemeLinkEl);
      if (!darkThemeLinkEl) {
        this._addDarkTheme();
      } else {
        this._removeDarkTheme();
      }
    },
  },
};
</script>

<style>
#home {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
}
</style>
