<template>
  <div :class="'container p-5 shadow-lg'">
    <form @submit.prevent="createUser">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          v-model="User.names"
          class="form-control"
          id="name"
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterPage',

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
    async createUser() {
      try {
        const response = await axios.post(
          "http://localhost:6900/authuser",
          this.User
        );
        console.log("User created:", response.data);

        // Clear the form
        this.User = { names: "", email: "", pass: "", rol: "" };

        // Redirect or give feedback
        this.$router.push("/");  // or wherever you want to redirect
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
  },
}
</script>


















<template>
  <div class="container p-5 shadow-lg">
    <form @submit.prevent="loginUser">
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
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification'; // Import toast hook

export default {
  name: 'LoginPage',

  setup() {
    const toast = useToast(); // Initialize toast
    return { toast };
  },

  data() {
    return {
      User: {
        email: "",
        pass: "",
      },
    };
  },

 methods: {
    async loginUser() {
        try {
            console.log('Attempting to log in with:', this.User);

            const response = await axios.post('http://localhost:6900/authlogin', this.User);
            console.log('Login successful, response:', response.data);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('rol', response.data.rol);
            localStorage.setItem('names', response.data.names);

            this.toast.success('Login successful!', {
                position: "top-center",
                autoClose: 3000,
            });

            this.$router.push("/register");
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);

            this.toast.error('Login failed. Please check your credentials.', {
                position: "top-center",
                autoClose: 3000,
            });
        }
    },
}

};
</script>

<style>
/* Add custom styles if needed */
</style>
