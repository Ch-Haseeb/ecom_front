import axios from "axios";
const baseURL = process.env.VUE_APP_BACKEND_APP_API_URL;

const authApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


const token = localStorage.getItem("token");
if (token) {
  authApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function addProduct(productData) {
  return authApi.post("/products", productData);
}

export function getProduct(productData) { 
  return authApi.get("/products", productData);
}

export function updateProduct(productId, productData) {

    productData._method = "PUT";
    return authApi.post(`/products/${productId}`, productData);
  }

export function deleteProduct(productId) {
    return authApi.delete(`/products/${productId}`);
}