<template>
  <div class="container card">
    <div class="card-header">
      <h4>Product</h4>
      <router-link to="/ca" class="btn btn-primary float-end">Add New</router-link>
    </div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>QTY</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in products" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.names }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.qty }}</td>
            <td>
              <router-link :to="{name: 'EditProduct', params:{id: item.id} }" class="btn btn-primary">Edit</router-link>
              <button @click="deleteProduct(item.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductPage',
  data() {
    return {
      products: []
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:6900/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`http://localhost:6900/products/${id}`);
        this.products = this.products.filter(product => product.id !== id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }
};
</script>




............................


<template>
  <div class="container card">
    <div class="card-header">
      <router-link to="/ca" class="btn btn-primary"> Add New </router-link>

      <div class="row align-items-center float-end">
        <div class="col-12 col-md-6 mb-2 mb-md-0">
          <div class="search-bar">
            <input
              type="text"
              class="form-control"
              v-model="searchQuery"
              @input="fetchProducts(1, searchQuery, itemsPerPage)"
              placeholder="Search Products"
            />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="d-flex align-items-center">
            <p class="mb-0 me-2">ចំនួនសរុប</p>
            <select
              v-model="itemsPerPage"
              @change="fetchProducts(1, searchQuery, itemsPerPage)"
              class="form-select"
            >
              <option
                v-for="value in [5, 10, 15, 20, 50, 100]"
                :key="value"
                :value="value"
              >
                {{ value }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>QTY</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="products.length === 0">
            <td colspan="5">No products found</td>
          </tr>
          <tr v-else v-for="(item, index) in products" :key="index">
            <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td>{{ item.names }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.qty }}</td>
            <td>
              <router-link
                :to="{ name: 'EditProduct', params: { id: item.id } }"
                class="btn btn-primary"
              >
                Edit
              </router-link>
              <button @click="deleteProduct(item.id)" class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-end">
          <li class="page-item">
            <a
              @click="fetchProducts(1, searchQuery, itemsPerPage)"
              :disabled="currentPage === 1"
              class="page-link"
              href="#"
              >«</a
            >
          </li>
          <li class="page-item">
            <a
              @click="fetchProducts(currentPage - 1, searchQuery, itemsPerPage)"
              :disabled="currentPage === 1"
              class="page-link"
              href="#"
              >‹</a
            >
          </li>
          <li class="page-item" v-for="page in paginatedPages" :key="page">
            <a v-if="page === '...'" class="page-link" href="#">{{ page }}</a>
            <a
              v-else
              @click="fetchProducts(page, searchQuery, itemsPerPage)"
              :class="{ active: currentPage === page }"
              class="page-link"
              href="#"
              >{{ page }}</a
            >
          </li>
          <li class="page-item">
            <a
              @click="fetchProducts(currentPage + 1, searchQuery, itemsPerPage)"
              :disabled="currentPage === totalPages"
              class="page-link"
              href="#"
              >›</a
            >
          </li>
          <li class="page-item">
            <a
              @click="fetchProducts(totalPages, searchQuery, itemsPerPage)"
              :disabled="currentPage === totalPages"
              class="page-link"
              href="#"
              >»</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductPage",
  data() {
    return {
      products: [],
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 3, // Default value
      totalProducts: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalProducts / this.itemsPerPage);
    },
    paginatedPages() {
      const pages = [];
      const startPage = Math.max(2, this.currentPage - 2);
      const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

      if (this.currentPage > 3) {
        pages.push(1);
      }

      if (this.currentPage > 4) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (this.currentPage < this.totalPages - 3) {
        pages.push("...");
      }

      if (this.currentPage < this.totalPages - 2) {
        pages.push(this.totalPages);
      }

      return pages;
    },
  },
  methods: {
    async fetchProducts(page = 1, search = "", limit = this.itemsPerPage) {
      try {
        const response = await axios.get("http://localhost:6900/products", {
          params: {
            page,
            search,
            limit,
          },
        });
        this.products = response.data.data;
        this.totalProducts = response.data.total;
        this.currentPage = page;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`http://localhost:6900/products/${id}`);
        this.products = this.products.filter((product) => product.id !== id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
