import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  INotification,
  NotificationConstant,
} from "../../../interfaces/model/notification";
import {
  IChangePasswordReq,
  IUpdateEmployeeReq,
} from "../../../interfaces/request/employee.request";
import { storageManager } from "../../../helper/storager";
import EmployeeApi from "../../api/employee.api";

export type ProfilePayload = {
  loading: boolean;
  profile: IUpdateEmployeeReq;
  notification?: INotification;
  succeed?: boolean;
};
const initialState = {
  loading: false,
  profile: {},
} as ProfilePayload;

export const getMyProfile = createAsyncThunk(
  "/api/profile/get-profile",
  async (_, thunkAPI) => {
    try {
      const id = storageManager.getUserId();
      const response = await EmployeeApi.getEmployeeById(id!);
      const data: IUpdateEmployeeReq = response.data;

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Load failed`);
    }
  }
);
export const changePasswordProfile = createAsyncThunk(
  "/api/profile/change-password",
  async ({ body }: { body: IChangePasswordReq }, thunkAPI) => {
    try {
      const id = storageManager.getUserId()!.toString();
      await EmployeeApi.changePassword(id!, body);
      return id;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Update profile is failed");
    }
  }
);
export const updateProfile = createAsyncThunk(
  "/api/profile/update-profile",
  async ({ profile }: { profile: IUpdateEmployeeReq }, thunkAPI) => {
    try {
      const id = storageManager.getUserId()!.toString();
      const response = await EmployeeApi.updateEmployee(profile, id);
      const data = response.data;
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Update profile is failed");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearStatusProfile: (state) => {
      state.succeed = undefined;
      state.notification = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // get profile =================================================================
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getMyProfile.fulfilled,
        (state, action: PayloadAction<IUpdateEmployeeReq>) => {
          state.loading = false;
          state.succeed = undefined;
          state.profile = action.payload;
        }
      )
      .addCase(getMyProfile.rejected, (state) => {
        state.loading = false;
      })
      // change password profile =================================================================
      .addCase(changePasswordProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        changePasswordProfile.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.succeed = true;
          state.notification = {
            type: NotificationConstant.SUCCESS,
            message: "Change password successfully",
          };
        }
      )
      .addCase(changePasswordProfile.rejected, (state) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Change password failed",
        };
      })
      //  update profile =================================================================
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.succeed = true;
          state.notification = {
            type: NotificationConstant.SUCCESS,
            message: "Update profile successfully",
          };
        }
      )
      .addCase(updateProfile.rejected, (state) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Update profile failed",
        };
      });
  },
});

export const { clearStatusProfile } = profileSlice.actions;
export default profileSlice.reducer;
