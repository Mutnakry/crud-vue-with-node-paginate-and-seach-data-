

<template>
  <div class="container">
    <form @submit.prevent="updateProduct">
      <div class="form-group">
        <label for="editName">Name:</label>
        <input
          type="text"
          v-model="names"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="editPrice">Price:</label>
        <input
          type="number"
          v-model="price"
          class="form-control"
          id="editPrice"
          required
        />
      </div>
      <div class="form-group">
        <label for="editQty">Quantity:</label>
        <input
          type="number"
          v-model="qty"
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
      names: "",
      price: "",
      qty: "",
      id: "", // Ensure id is included in editProduct for updates
    };
  },
  mounted() {
    this.fetchProduct(this.$route.params.id);
  },
  methods: {
    async fetchProduct(id) {
      try {
        const response = await axios.get(`http://localhost:6900/products/${id}`);
        this.names = response.data[0].names;
        this.price = response.data[0].price;
        this.qty = response.data[0].qty;
        this.id = response.data[0].id; // Added to set the id
        console.log(response.data.names);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },

    async updateProduct() {
      try {
        const product = {
          names: this.names,
          price: this.price,
          qty: this.qty,
        };
        await axios.put(`http://localhost:6900/updateproducts/${this.id}`, product);
        this.$router.push("/"); // Navigate to the home page or any other page after updating
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
  },
};
</script>
