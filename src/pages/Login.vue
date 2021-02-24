<template>
  <div class="login">
    <h2 align="center">Login</h2>
    <form @submit.prevent="submitForm" id="loginForm">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model.trim="$v.email.$model"
        />
        <span class="error" v-if="!$v.email.required && $v.email.$error"
          >Email is required</span
        >
        <span class="error" v-if="!$v.email.isUnique && $v.email.$error"
          >Email is invalid</span
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model.trim="$v.password.$model"
        />
        <span class="error" v-if="!$v.password.required && $v.password.$error"
          >Password is required</span
        >
        <span class="error" v-if="!$v.password.minLength && $v.password.$error"
          >Password must have atleast
          {{ $v.password.$params.minLength.min }} letters</span
        >
        <span class="error" v-if="!$v.password.maxLength && $v.password.$error"
          >Password must be of max length
          {{ $v.password.$params.maxLength.max }} letters</span
        >
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "anemharikrishna@gmail.com",
      password: "123456",
    };
  },
  validations: {
    email: {
      required,
      email,
      isUnique(value) {
        if (value === "") return true;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailRegex.test(value);
      },
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(10),
    },
  },
  methods: {
    submitForm: async function() {
      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error) return;

      const loader = this.$loading.show({});
      const userLoginRequest = {
        username: this.email,
        password: this.password,
      };
      try {
        const response = await axios.post(`login`, { ...userLoginRequest });
        if (response?.data?.success) {
          loader.hide();
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: response.data.data.data.email,
              name: response.data.data.data.name,
            })
          );
          localStorage.setItem("jwt", response.headers.authtoken);

          if (localStorage.getItem("jwt") != null) {
            this.$emit("loggedIn", true);
            this.$router.push({ name: "dashboard" });
          }
        }
      } catch (error) {
        Vue.$toast.open({
          message:
            error.response?.data?.error ||
            error.response?.data?.message ||
            error?.message,
          type: "error",
          position: "top-right",
        });
        loader.hide();
      }
    },
  },
};
</script>

<style>
.login {
  width: 500px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
}
</style>
