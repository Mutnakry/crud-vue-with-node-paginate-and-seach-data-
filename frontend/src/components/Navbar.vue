
<template>
  <div class="container bg-secondary">
    <nav class="navbar navbar-expand-sm bg-secondary">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/">Category</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Product">Product</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/studentlist">Sale</a>
        </li>
          <button @click="logout">Logout</button>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
   methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
  },
}
</script>
