import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Product } from "@/models/product.model";
import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api";

export const useStockStore = defineStore("stock", () => {
  const autocompleteOptions = ref<string[]>([]);
  const stocks = ref<Product[]>([]);
  const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);

  const loadProduct = async () => {
    //http interceptor
    const result = await api.getProducts();
    stocks.value = result.data;
  };

  const getProductImage = (image: string) => {
    return "http://localhost:3001/images/" + image;
  };

  const onConfirmDelete = (id: String) => {
    alert("ok" + id);
  };

  return {
    getProductImage,
    loadProduct,
    fetchingStatus,
    stocks,
    autocompleteOptions,
    onConfirmDelete,
  };
});
