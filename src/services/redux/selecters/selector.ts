import { createSelector } from "@reduxjs/toolkit";
import { LoginPayload } from "../slices/login.slice";
import { RootState } from "../store";

export const loginSelector = (state: RootState) => state.login;
export const categorySelector = (state: RootState) => state.category;
export const productSelector = (state: RootState) => state.product;
export const employeeSelector = (state: RootState) => state.employee;
export const revenueSelector = (state: RootState) => state.revenue;

// export const loginSelector = createSelector(

// );
