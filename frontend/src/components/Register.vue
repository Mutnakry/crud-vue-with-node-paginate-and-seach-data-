<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="row w-100">
      <div class="col-md-8 col-lg-6 col-xl-4">
        <div class="card shadow-lg">
          <div class="card-body p-4">
            <h2 class="text-center mb-4">Login</h2>
            <form @submit.prevent="registerUser">
              <div class="form-group">
                <label for="names">Name:</label>
                <input
                  type="text"
                  v-model="User.names"
                  class="form-control"
                  id="names"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  v-model="User.email"
                  class="form-control"
                  id="email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="pass">Password:</label>
                <input
                  type="password"
                  v-model="User.pass"
                  class="form-control"
                  id="pass"
                  required
                />
              </div>
              <div class="form-group">
                <label for="rol">Role:</label>
                <select v-model="User.rol" class="form-control" id="rol">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "RegisterPage",

  setup() {
    const toast = useToast();
    return { toast };
  },

  data() {
    return {
      User: {
        names: "",
        email: "",
        pass: "",
        rol: "",
      },
    };
  },

  methods: {
    async registerUser() {
      try {
        await axios.post("http://localhost:6900/authuser", this.User);
        this.toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        this.$router.push("/"); // Redirect to login page after successful registration
      } catch (error) {
        this.toast.error("Registration failed. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    },
  },
};
</script>
