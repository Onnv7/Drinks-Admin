export interface IRevenueTime {
  day: number;
  month: number;
  year: number;
}

export interface IRevenueChartRes {
  time: IRevenueTime;
  revenue: number;
}

export interface IRevenueChart {
  time: string;
  revenue: number;
}

export interface IOrderStatistic {
  orderQuantity: number;
  difference: number;
}

export interface ITransactionStatistic {
  revenue: number;
  ratio: number;
}
