<template>
  <div class="dashboard">
    <h2 align="center" v-if="loggedInUserName">Hi, {{ loggedInUserName }}</h2>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  props: ["loggedInUserName"],
};
</script>

<style>
.dashboard {
  width: 500px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
}
</style>
