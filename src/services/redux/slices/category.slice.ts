import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryApi from "../../api/category.api";
import {
  ICreateCategoryReq,
  IUpdateCategoryReq,
} from "../../../interfaces/request/category.request";

import { ICategory } from "../../../interfaces/model/category";
import {
  INotification,
  NotificationConstant,
} from "../../../interfaces/model/notification";

export type CategoryPayload = {
  loading: boolean;
  categories: ICategory[];
  succeed?: boolean;
  notification?: INotification;
};

const initialState = {
  loading: false,
  categories: [],
} as CategoryPayload;

export const getAllCategory = createAsyncThunk(
  "/api/category/get-all-categories",
  async (_, thunkAPI) => {
    try {
      const response = await CategoryApi.getAllCategory();
      const data: ICategory[] = response.data;
      return data;
    } catch (error: unknown) {
      console.error(error);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "/api/category/create-category",
  async (body: ICreateCategoryReq, thunkAPI) => {
    try {
      const response = await CategoryApi.createCategory(body);
      const data: ICategory = response.data;
      return data;
    } catch (error: unknown) {
      console.error(error);
      return thunkAPI.rejectWithValue("Create category failed");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "/api/category/delete-category",
  async (id: string, thunkAPI) => {
    try {
      await CategoryApi.deleteCategory(id);
      return id;
    } catch (error: unknown) {
      console.error(error);
      return thunkAPI.rejectWithValue("Delete category failed");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "/api/category/update-category",
  async (
    { category, id }: { category: IUpdateCategoryReq; id: string },
    thunkAPI
  ) => {
    try {
      const response = await CategoryApi.updateCategory(category, id);
      const data: ICategory = response.data;
      return data;
    } catch (error: unknown) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearStatusCategory: (state) => {
      state.succeed = undefined;
      state.notification = undefined;
    },
  },
  extraReducers(builder) {
    builder
      // get all category =================
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllCategory.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.loading = false;
          state.categories = action.payload;
          state.succeed = undefined;
        }
      )
      .addCase(getAllCategory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.categories = [];
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: action.payload,
        };
      })

      // create category =================
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.loading = false;
          state.categories.push(action.payload);
          state.succeed = true;
          state.notification = {
            type: NotificationConstant.SUCCESS,
            message: "Create category succeeded",
          };
        }
      )
      .addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: action.payload,
        };
      })

      // delete category =================
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.categories = state.categories.filter(
            (item) => item.id !== action.payload
          );
          state.succeed = true;
          state.notification = {
            type: NotificationConstant.SUCCESS,
            message: "Delete category successfully",
          };
        }
      )
      .addCase(deleteCategory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: action.payload,
        };
      })

      // update category =================
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.loading = false;
          const index = state.categories.findIndex(
            (item) => item.id === action.payload.id
          );
          state.categories[index] = action.payload;
          state.succeed = true;
          state.notification = {
            type: NotificationConstant.SUCCESS,
            message: "Update category successfully",
          };
        }
      )
      .addCase(updateCategory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: action.payload,
        };
      });
  },
});

export const { clearStatusCategory } = categorySlice.actions;
export default categorySlice.reducer;
