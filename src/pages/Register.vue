<template>
  <div class="register">
    <h2 align="center">Register</h2>
    <form @submit.prevent="submitForm" id="registrationForm">
      <div class="form-group">
        <label for="exampleInputEmail1">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          aria-describedby="emailHelp"
          placeholder="Enter First Name"
          v-model.trim="$v.firstName.$model"
        />
        <span class="error" v-if="!$v.firstName.required && $v.firstName.$error"
          >First name is required</span
        >
        <span
          class="error"
          v-if="!$v.firstName.minLength && $v.firstName.$error"
          >First name must have atleast
          {{ $v.firstName.$params.minLength.min }} letters</span
        >
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          aria-describedby="emailHelp"
          placeholder="Enter Last Name"
          v-model.trim="$v.lastName.$model"
        />
        <span class="error" v-if="!$v.lastName.required && $v.lastName.$error"
          >Last name is required</span
        >
        <span class="error" v-if="!$v.lastName.minLength && $v.lastName.$error"
          >Last name must have atleast
          {{ $v.lastName.$params.minLength.min }} letters</span
        >
      </div>
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
      <div class="form-group">
        <label for="exampleInputPassword1">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="cpassword"
          placeholder="Confirm Password"
          v-model.trim="$v.cpassword.$model"
        />
        <span
          class="error"
          v-if="!$v.cpassword.confirmPassword && $v.cpassword.$error"
          >Password and Confirm passwords must be same</span
        >
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
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
  sameAs,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
    };
  },
  validations: {
    firstName: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(10),
    },
    lastName: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(10),
    },
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
    cpassword: {
      confirmPassword: sameAs("password"),
    },
  },
  methods: {
    submitForm: function(event) {
      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error) return;
      const userRegisterRequest = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };

      axios
        .post(
          `https://nodejs-signup-signin-apis.herokuapp.com/api/v1/register`,
          {
            ...userRegisterRequest,
          }
        )
        .then((response) => {
          if (response.data.success) {
            Vue.$toast.open({
              message: "Registration successful",
              type: "success",
              position: "top-right",
            });

            event.target.reset();
          }
        })
        .catch((error) => {
          Vue.$toast.open({
            message:
              error.response?.data?.error ||
              error.response?.data?.message ||
              error?.message,
            type: "error",
            position: "top-right",
          });
        });
    },
  },
};
</script>

<style>
.register {
  width: 500px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
}
.error {
  color: red;
  font-size: 10px;
}
</style>
