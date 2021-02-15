<template>
  <div class="register">
    <h2 align="center">Register</h2>
    <form @submit.prevent="submitForm">
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
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="cpassword"
          placeholder="Confirm Password"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
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
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      // if (this.$v.$invalid) {

      //   }
    },
  },
};
</script>

<style>
.register {
  width: 500px;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
}
.error {
  color: red;
  font-size: 10px;
}
</style>
