import { createSelector } from "@reduxjs/toolkit";
import { LoginPayload } from "../slices/auth.slice";
import { RootState } from "../store";

export const authSelector = (state: RootState) => state.auth;
export const categorySelector = (state: RootState) => state.category;
export const productSelector = (state: RootState) => state.product;
export const employeeSelector = (state: RootState) => state.employee;
export const revenueSelector = (state: RootState) => state.revenue;
export const sidebarSelector = (state: RootState) => state.sidebar;
export const profileSelector = (state: RootState) => state.profile;

// export const loginSelector = createSelector(

// );
