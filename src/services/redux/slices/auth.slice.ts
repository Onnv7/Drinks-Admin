import AuthApi from "../../api/auth.api";
import { ILoginReq } from "../../../interfaces/request/auth.request";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ILoginRes } from "../../../interfaces/response/auth.response";

import { AxiosError } from "axios";

export type LoginPayload = {
  loading: boolean;
  loginRes: ILoginRes | null;
  error: string | null;
};

const initialState = {
  loading: false,
  loginRes: null,
  error: null,
} as LoginPayload;

export const login = createAsyncThunk(
  "/api/employee/login",
  async (body: ILoginReq, thunkAPI) => {
    try {
      const { data: response } = await AuthApi.login(body);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        let msg = "Authentication failed";
        return thunkAPI.rejectWithValue(msg);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ILoginRes>) => {
        state.loading = false;
        state.loginRes = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default authSlice.reducer;
