<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="row w-100">
      <div class="col-md-8 col-lg-6 col-xl-4">
        <div class="card shadow-lg">
          <div class="card-body p-4">
            <h2 class="text-center mb-4">Login</h2>
            <form @submit.prevent="loginUser">
              <div class="form-group mb-3">
                <label for="names">Username:</label>
                <input
                  type="text"
                  v-model="User.names"
                  class="form-control"
                  id="names"
                  required
                />
              </div>
              <div class="form-group mb-4">
                <label for="pass">Password:</label>
                <input
                  type="password"
                  v-model="User.pass"
                  class="form-control"
                  id="pass"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
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
  name: "LoginPage",
  setup() {
    const toast = useToast();
    return { toast };
  },

  data() {
    return {
      User: {
        names: "",
        pass: "",
      },
    };
  },

  methods: {
    async loginUser() {
      try {
        const response = await axios.post(
          "http://localhost:6900/authlogin",
          this.User
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("rol", response.data.rol);
        localStorage.setItem("names", response.data.names);

        this.toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
        });

        this.$router.push("/pro"); // Redirect to dashboard
      } catch (error) {
        this.toast.error("Login failed. Please check your credentials.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
.card {
  border-radius: 0.5rem; /* Rounded corners for card */
}

.card-body {
  padding: 2rem; /* Consistent padding inside card */
}
</style>
