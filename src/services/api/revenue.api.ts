import { ILoginReq } from "../../interfaces/request/auth.request";
import { axiosPrivate, axiosPublic } from "./axios";

const RevenueApi = {
  getRevenueChartData: async (timeType: string) => {
    const { data } = await axiosPrivate.get(
      `/api/transaction/revenue?time=${timeType}`
    );
    return data;
  },
  getOrderQuantity: async (status: string) => {
    const { data } = await axiosPrivate.get(
      `/api/order/quantity/today?status=${status}`
    );
    return data;
  },

  getRevenueToday: async () => {
    const { data } = await axiosPrivate.get(`/api/transaction/revenue/today`);
    return data;
  },
};

export default RevenueApi;
