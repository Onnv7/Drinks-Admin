import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../../interfaces/model/product";
import {
  ICreateProductReq,
  IGetAllProductsReq,
  IUpdateProductReq,
} from "../../../interfaces/request/product.request";
import ProductApi from "../../api/product.api";
import {
  IGetProductDetailsByIdRes,
  IUpdateProductRes,
} from "../../../interfaces/response/product.response";
import { stat } from "fs";
import { IUpdateCategoryReq } from "../../../interfaces/request/category.request";
import {
  INotification,
  NotificationConstant,
} from "../../../interfaces/model/notification";

export type ProductPayload = {
  loading: boolean;
  products: IProduct[];
  table: IGetAllProductsReq[];
  productDetails?: IGetProductDetailsByIdRes;
  updateProduct: IUpdateProductReq;
  succeed?: boolean;
  notification?: INotification;
};

const initialState = {
  loading: false,
  products: [],
  table: [],
  updateProduct: {} as IUpdateProductReq,
} as ProductPayload;

export const getAllProduct = createAsyncThunk(
  "/api/product/get-all-product",
  async (_, thunkAPI) => {
    try {
      const response = await ProductApi.getAllProduct();
      const data: IGetAllProductsReq[] = response.data;

      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Load failed");
    }
  }
);

export const getProductDetailsById = createAsyncThunk(
  "/api/product/get-product-details",
  async (id: string, thunkAPI) => {
    try {
      const response = await ProductApi.getProductDetailsById(id);
      const data: IGetProductDetailsByIdRes = response.data;
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Load failed");
    }
  }
);

export const createProduct = createAsyncThunk(
  "/api/product/create-product",
  async (product: ICreateProductReq, thunkAPI) => {
    try {
      const response = await ProductApi.createProduct(product);
      const data: IProduct = response.data;
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue("Create product failed");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "/api/product/update-product",
  async (
    { product, id }: { product: IUpdateProductReq; id: string },
    thunkAPI
  ) => {
    try {
      const response = await ProductApi.updateProduct(product, id);
      const data: IUpdateProductRes = response.data;

      return data;
    } catch (error: unknown) {
      console.log(error);
      return thunkAPI.rejectWithValue("Create product failed");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/api/product/delete-product",
  async (id: string, thunkAPI) => {
    try {
      await ProductApi.deleteProduct(id);

      return id;
    } catch (error: unknown) {
      console.log(error);
      return thunkAPI.rejectWithValue("Delete product failed");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearStatusProduct: (state) => {
      state.succeed = undefined;
      state.notification = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all product ======================================================
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.succeed = undefined;
      })
      .addCase(
        getAllProduct.fulfilled,
        (state, action: PayloadAction<IGetAllProductsReq[]>) => {
          state.loading = false;
          state.table = action.payload;
        }
      )
      .addCase(getAllProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Load Product failed",
        };
      })

      // get product's details by id ===================================
      .addCase(getProductDetailsById.pending, (state) => {
        state.loading = true;
        state.succeed = undefined;
      })
      .addCase(
        getProductDetailsById.fulfilled,
        (state, action: PayloadAction<IGetProductDetailsByIdRes>) => {
          state.loading = false;
          state.productDetails = action.payload;
          state.succeed = undefined;
          const updateProduct = {
            name: state.productDetails.name,
            image: null,
            sizeList: state.productDetails.sizeList ?? [],
            description: state.productDetails.description,
            toppingList: state.productDetails.toppingList ?? [],
            categoryId: state.productDetails.categoryId,
            enabled: state.productDetails.enabled,
          } as IUpdateProductReq;
          state.updateProduct = updateProduct;
        }
      )
      .addCase(
        getProductDetailsById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.succeed = false;
          state.notification = {
            type: NotificationConstant.ERROR,
            message: action.payload,
          };
        }
      )
      // create product =================================================================
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.succeed = undefined;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.loading = false;
          state.products.push(action.payload);
          state.succeed = true;
          state.notification = {
            type: NotificationConstant.SUCCESS,
            message: "Create product successfully",
          };
        }
      )
      .addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.succeed = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: action.payload,
        };
      })
      // update product =================================================================
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.succeed = undefined;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<IUpdateProductRes>) => {
          state.loading = false;
          state.succeed = undefined;
          state.notification = {
            type: NotificationConstant.SUCCESS,
            message: "Product updated successfully",
          };
        }
      )
      .addCase(updateProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.succeed = action.payload;
        state.notification = {
          type: "error",
          message: action.payload,
        };
      })
      // delete product =================================================
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.succeed = undefined;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.succeed = undefined;
          state.table = [...state.table].filter(
            (item) => item.id !== action.payload
          );
          state.notification = {
            type: NotificationConstant.SUCCESS,
            message: `Delete product ${action.payload} successfully`,
          };
        }
      )
      .addCase(deleteProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.succeed = action.payload;
        state.notification = {
          type: "error",
          message: action.payload,
        };
      });
  },
});
export const { clearStatusProduct } = productSlice.actions;
export default productSlice.reducer;
