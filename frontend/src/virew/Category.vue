<template>
  <!-- Existing code -->
  <div class="container">
    <form @submit.prevent="createProduct">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          v-model="newProduct.names"
          class="form-control"
          id="name"
          required
        />
      </div>
      <div class="form-group">
        <label for="price">Price2:</label>
        <input
          type="number"
          v-model="newProduct.price"
          class="form-control"
          id="price"
          required
        />
      </div>
      <div class="form-group">
        <label for="qty">Quantity:</label>
        <input
          type="number"
          v-model="newProduct.qty"
          class="form-control"
          id="qty"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Product</button>
    </form>
  </div>
  <!-- Existing code -->
</template>

<script>
import axios from "axios";

export default {
  name: "ProductForm",

  data() {
    return {
      products: [],
      newProduct: {
        names: "",
        price: "",
        qty: "",
      },
    };
  },
  methods: {
    async createProduct() {
      try {
        const response = await axios.post(
          "http://localhost:6900/addproducts",
          this.newProduct
        );
        this.products.push(response.data);
        this.newProduct = { names: "", price: "", qty: "" }; // Clear the form
        this.$router.push("/");
      } catch (error) {
        console.error("Error creating product:", error);
      }
    },
  },
};
</script>

