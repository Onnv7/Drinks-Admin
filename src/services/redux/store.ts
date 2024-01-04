import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import categorySlice from "./slices/category.slice";
import productSlice from "./slices/product.slice";
import employeeSlice from "./slices/employee.slice";
import revenueSlice from "./slices/revenue.slice";
import sidebarSlice from "./slices/sidebar.slice";
import profileSlice from "./slices/profile.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    product: productSlice,
    employee: employeeSlice,
    revenue: revenueSlice,
    sidebar: sidebarSlice,
    profile: profileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
