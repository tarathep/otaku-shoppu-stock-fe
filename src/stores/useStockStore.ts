import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Product } from "@/models/product.model";
import { defineStore } from "pinia";
import { ref } from "vue";

const dummyData: Product[] = [
  {
    name: "Product1",
    stock: 99,
    price: 100,
  },
  {
    name: "Product2",
    stock: 99,
    price: 100,
  },
  {
    name: "Product3",
    stock: 99,
    price: 100,
  },
];

export const useStockStore = defineStore("stock", () => {
  const autocompleteOptions = ref<string[]>([]);
  const stocks = ref<Product[]>(dummyData);
  const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);

  return {
    fetchingStatus,
    stocks,
    autocompleteOptions,
  };
});
