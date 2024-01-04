import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  INotification,
  NotificationConstant,
} from "../../../interfaces/model/notification";
import {
  IOrderStatistic,
  IRevenueChart,
  IRevenueChartRes,
  ITransactionStatistic,
} from "../../../interfaces/response/revenue.response";
import RevenueApi from "../../api/revenue.api";

export type RevenuePayload = {
  loading: boolean;
  revenueChart: IRevenueChart[];
  succeed?: boolean;
  notification?: INotification;
  succeedOrderStatistic?: IOrderStatistic;
  canceledOrderStatistic?: IOrderStatistic;
  revenueToday?: ITransactionStatistic;
};

const initialState = {
  loading: false,
  revenueChart: [],
} as RevenuePayload;

export const getRevenueChartData = createAsyncThunk(
  "/api/revenue/get-revenue-chart-data",
  async (timeType: string, thunkAPI) => {
    try {
      const response = await RevenueApi.getRevenueChartData(timeType);
      const data: IRevenueChartRes[] = response.data;
      const newData = data.map((it) => {
        let time = `${it.time.day}-${it.time.month}-${it.time.year}`;
        if (timeType === "month") {
          time = `${it.time.month}-${it.time.year}`;
        } else if (timeType === "year") {
          time = `${it.time.year}`;
        }
        return {
          time: time,
          revenue: it.revenue,
        } as IRevenueChart;
      });
      return newData;
    } catch (error) {
      return thunkAPI.rejectWithValue("Load failed");
    }
  }
);
export const getSucceedOrderQuantity = createAsyncThunk(
  "/api/revenue/get-succeed-order-quantity",
  async (_, thunkAPI) => {
    try {
      const response = await RevenueApi.getOrderQuantity("SUCCEED");
      const data: IOrderStatistic = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Load failed");
    }
  }
);
export const getCanceledOrderQuantity = createAsyncThunk(
  "/api/revenue/get-canceled-order-quantity",
  async (_, thunkAPI) => {
    try {
      const response = await RevenueApi.getOrderQuantity("CANCELED");
      const data: IOrderStatistic = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Load failed");
    }
  }
);
export const getRevenueToday = createAsyncThunk(
  "/api/revenue/get-revenue-today",
  async (_, thunkAPI) => {
    try {
      const response = await RevenueApi.getRevenueToday();
      const data: ITransactionStatistic = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Load failed");
    }
  }
);

const revenueSlice = createSlice({
  name: "revenue",
  initialState,
  reducers: {
    clearStatusRevenue: (state) => {
      state.succeed = undefined;
      state.notification = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRevenueChartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getRevenueChartData.fulfilled,
        (state, action: PayloadAction<IRevenueChart[]>) => {
          state.loading = false;
          state.revenueChart = action.payload;
          state.succeed = undefined;
        }
      )
      .addCase(getRevenueChartData.rejected, (state) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Load failed",
        };
      })
      .addCase(getSucceedOrderQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getSucceedOrderQuantity.fulfilled,
        (state, action: PayloadAction<IOrderStatistic>) => {
          state.loading = false;
          state.succeedOrderStatistic = action.payload;
          state.succeed = undefined;
        }
      )
      .addCase(getSucceedOrderQuantity.rejected, (state) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Load failed",
        };
      })
      .addCase(getCanceledOrderQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCanceledOrderQuantity.fulfilled,
        (state, action: PayloadAction<IOrderStatistic>) => {
          state.loading = false;
          state.canceledOrderStatistic = action.payload;
          state.succeed = undefined;
        }
      )
      .addCase(getCanceledOrderQuantity.rejected, (state) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Load failed",
        };
      })
      .addCase(getRevenueToday.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getRevenueToday.fulfilled,
        (state, action: PayloadAction<ITransactionStatistic>) => {
          state.loading = false;
          state.revenueToday = action.payload;
          state.succeed = undefined;
        }
      )
      .addCase(getRevenueToday.rejected, (state) => {
        state.loading = false;
        state.notification = {
          type: NotificationConstant.ERROR,
          message: "Load failed",
        };
      });
  },
});

export const { clearStatusRevenue } = revenueSlice.actions;
export default revenueSlice.reducer;
