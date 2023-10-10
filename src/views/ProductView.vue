<template>
  <div>
 
    <v-overlay v-if="loading" color="white">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div v-else>
      <Navbar />
      <v-container class="mt-6">
        <v-card class="elevation-3">
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              label="Search by Name or Price"
              @input="filterProducts"
              outlined
              dense
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openAddDialog">Add Product</v-btn>
          </v-toolbar>

          <v-divider class="my-4"></v-divider>

          <v-data-table
            :headers="headers"
            :items="filteredProducts"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon size="small" class="me-2" @click="editProduct(item)"
                >mdi-pencil</v-icon
              >
              <v-icon size="small" @click="confirmDeleteProduct(item)"
                >mdi-delete</v-icon
              >
            </template>
          </v-data-table>

          <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title>{{
                editMode ? "Edit Product" : "Add Product"
              }}</v-card-title>
              <v-card-text>
                <v-form ref="editForm">
                  <v-text-field
                    v-model="editedProduct.name"
                    label="Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedProduct.price"
                    label="Price"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedProduct.quantity"
                    label="Quantity"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedProduct.description"
                    label="Description"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="blue" @click="saveProduct">{{
                  editMode ? "Update" : "Add"
                }}</v-btn>

                <v-btn color="red" @click="closeEditDialog">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/ProductAPI.JS";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Price", value: "price" },
        { text: "Quantity", value: "quantity" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      products: [],
      search: "",
      editDialog: false,
      editMode: false,
      editedProduct: {
        name: "",
        price: "",
        quantity: "",
        description: "",
      },
      loading: true, 
    };
  },

  computed: {
    filteredProducts() {
      return this.products.filter(
        (product) =>
          product.name.toLowerCase().includes(this.search.toLowerCase()) ||
          product.price.toString().includes(this.search)
      );
    },
  },
  created() {
    const isAuthenticated = true;

    if (isAuthenticated) {
      this.fetchProducts();
    } else {
      this.loading = false;
      this.$router.push("/login");
    }
  },

  methods: {
    fetchProducts() {
      getProduct()
        .then((response) => {
          this.products = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    openAddDialog() {
      this.editMode = false;
      this.editDialog = true;
    },

    closeEditDialog() {
      this.editMode = false;
      this.editDialog = false;
      this.$refs.editForm.reset();
    },

    saveProduct() {
      if (this.editMode) {
        updateProduct(this.editedProduct.id, this.editedProduct)
          .then(() => {
            console.log("Product updated:", this.editedProduct);
            this.closeEditDialog();
            this.fetchProducts();
          })
          .catch((error) => {
            console.error("Error updating product:", error);
            if (error.response) {

              const errorMessage = error.response.data.message;
              Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
              });
            }
          });
      } else {
        addProduct(this.editedProduct)
          .then((response) => {
            console.log("Product added:", response.data);
            this.closeEditDialog();
            this.fetchProducts();
          })
          .catch((error) => {
            if (error.response) {
              const errorMessage = error.response.data.message;
              Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
              });
            }
            console.error("Error adding product:", error);
          });
      }
    },

    editProduct(product) {
      this.editMode = true;
      this.editedProduct = { ...product };
      this.editDialog = true;
    },

    confirmDeleteProduct(product) {
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete ${product.name}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteProduct(product.id)
            .then(() => {
              console.log("Product deleted:", product.name);
              this.fetchProducts();
            })
            .catch((error) => {
              console.error("Error deleting product:", error);
            });
        }
      });
    },
  },
};
</script>
