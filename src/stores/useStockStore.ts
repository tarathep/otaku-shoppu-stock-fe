import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Product } from "@/models/product.model";
import { server } from "@/services/constants";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStockStore = defineStore("stock", () => {
  const autocompleteOptions = ref<string[]>([]);
  const stocks = ref<Product[]>([]);
  const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);

  const loadProduct = async () => {
    const result = await axios.get(
      "http://localhost:3001/api/v2/" + server.PRODUCT_URL
    );
    stocks.value = result.data;
  };

  const getProductImage = (image: string) => {
    return "http://localhost:3001/images/" + image;
  };

  return {
    getProductImage,
    loadProduct,
    fetchingStatus,
    stocks,
    autocompleteOptions,
  };
});
