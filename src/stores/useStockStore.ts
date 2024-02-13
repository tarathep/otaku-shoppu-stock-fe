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
    setLoading(FetchingStatus.fetching);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await api.getProducts();
      stocks.value = res.data;
    } catch (error) {
      setLoading(FetchingStatus.failed);
      return [];
    } finally {
      setLoading(FetchingStatus.success);
    }
  };

  const setLoading = (value: FetchingStatus) => {
    fetchingStatus.value = value;
  };

  const isLoading = () => {
    return fetchingStatus.value == FetchingStatus.fetching;
  };

  const getProductImage = (image: string) => {
    return "http://localhost:3001/images/" + image;
  };

  const onConfirmDelete = (id: String) => {
    alert("ok" + id);
  };

  const search = async (value: String) => {
    if (value) {
      const result = await api.getProductByKeyword(value);
      stocks.value = result.data;
      autocompleteOptions.value = result.data.map((product: any) => ({
        value: product.name,
      }));
    } else {
      await loadProduct();
    }
  };

  const onSelect = async (value: any) => {
    setLoading(FetchingStatus.fetching);
    try {
      if (value) {
        const result = await api.getProductByKeyword(value);
        stocks.value = result.data;
      } else {
        loadProduct();
      }
    } finally {
      setTimeout(() => {
        setLoading(FetchingStatus.success);
      }, 1000);
    }
  };

  return {
    onSelect,
    search,
    isLoading,
    getProductImage,
    loadProduct,
    fetchingStatus,
    stocks,
    autocompleteOptions,
    onConfirmDelete,
  };
});
