<template>
  <div class="container" v-if="editProduct">
    <form @submit.prevent="updateProduct">
      <div class="form-group">
        <label for="editName">Name:</label>
        <input
          type="text"
          v-model="editProduct.names"
          class="form-control"
          id="editName"
          required
        />
      </div>
      <div class="form-group">
        <label for="editPrice">Price:</label>
        <input
          type="number"
          v-model="editProduct.price"
          class="form-control"
          id="editPrice"
          required
        />
      </div>
      <div class="form-group">
        <label for="editQty">Quantity:</label>
        <input
          type="number"
          v-model="editProduct.qty"
          class="form-control"
          id="editQty"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Update Product</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductEditPage",
  data() {
    return {
      editProduct: {
        names: "",
        price: "",
        qty: "",
      },
    };
  },
  mounted() {
    this.fetchProduct(this.$route.params.id);
  },

  
  methods: {
    async fetchProduct(id) {
      try {
        const response = await axios.get(`http://localhost:6900/products/${id}`);
        this.editProduct = response.data;

      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },


    async updateProduct() {
      try {
        if (!this.editProduct || !this.editProduct.id) {
          throw new Error('Product ID is missing');
        }
        await axios.put(
          `http://localhost:6900/products/${this.editProduct.id}`,
          this.editProduct
        );
        this.$router.push('/'); // Redirect to product list page after update
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  },
};
</script>
