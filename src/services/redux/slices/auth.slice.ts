import AuthApi from "../../api/auth.api";
import { ILoginReq } from "../../../interfaces/request/auth.request";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ILoginRes } from "../../../interfaces/response/auth.response";

import { AxiosError } from "axios";
import { stat } from "fs";
import {
  INotification,
  NotificationConstant,
} from "../../../interfaces/model/notification";

export type LoginPayload = {
  loading: boolean;
  token: ILoginRes | null;
  error: string | null;
  notification?: INotification;
};

const initialState = {
  loading: false,
  token: null,
  error: null,
} as LoginPayload;

export const login = createAsyncThunk(
  "/api/employee/login",
  async (body: ILoginReq, thunkAPI) => {
    try {
      const response = await AuthApi.login(body);
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
  reducers: {
    resetState: (state) => {
      state.notification = undefined;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ILoginRes>) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
        state.notification = {
          message: "Login successful",
          type: NotificationConstant.SUCCESS,
        };
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.notification = {
          message: "Login failed",
          type: NotificationConstant.ERROR,
        };
      });
  },
});
export const { resetState } = authSlice.actions;
export default authSlice.reducer;
