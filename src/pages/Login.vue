<template>
  <div class="login">
    <h2 align="center">Login</h2>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
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

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<style>
.login {
  width: 500px;
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
}
</style>
