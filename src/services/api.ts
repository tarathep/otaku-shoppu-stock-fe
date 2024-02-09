import auth_api from "@/services/auth_api";
import stock_api from "@/services/stock_api";

export default {
  ...auth_api,
  ...stock_api,
};
