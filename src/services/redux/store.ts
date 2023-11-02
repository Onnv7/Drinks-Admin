import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/login.slice";
import categorySlice from "./slices/category.slice";
import productSlice from "./slices/product.slice";
import employeeSlice from "./slices/employee.slice";
import revenueSlice from "./slices/revenue.slice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    category: categorySlice,
    product: productSlice,
    employee: employeeSlice,
    revenue: revenueSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
