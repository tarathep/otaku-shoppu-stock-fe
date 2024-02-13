import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Product } from "@/models/product.model";
import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api";
import { debounce } from "lodash";

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

  const getColorTagByStock = (stock: number) => {
    if (stock >= 20) {
      return "#058001";
    } else if (stock >= 10) {
      return "#c2ab02";
    }
    return "#c20502";
  };

  const getProductImage = (image: string) => {
    return "http://localhost:3001/images/" + image;
  };

  const onConfirmDelete = async (id: string) => {
    await api.deleteProduct(id);
    await loadProduct();
  };

  const searchWithDebounce = async (value: string) => {
    debouncedSearch(value);
  };

  const debouncedSearch = debounce(async (value: string) => search(value), 500); // Adjust the debounce delay as needed

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
    getColorTagByStock,
    searchWithDebounce,
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
