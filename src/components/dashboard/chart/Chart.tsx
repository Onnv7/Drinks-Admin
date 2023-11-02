import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import "./chart.scss";
import DropList from "../../shared/dropList/DropList";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import { useEffect, useState } from "react";
import { getRevenueChartData } from "../../../services/redux/slices/revenue.slice";
import { revenueSelector } from "../../../services/redux/selecters/selector";
import { useSelector } from "react-redux";

type Props = {
  aspect: number;
  title: string;
};
const Chart: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const revenuePayload = useSelector(revenueSelector);
  const { aspect, title } = props;
  const [timeType, setTimeType] = useState("day");
  const [chartData, setChartData] = useState(revenuePayload.revenueChart);
  useEffect(() => {
    dispatch(getRevenueChartData(timeType));
  }, [dispatch, timeType]);
  useEffect(() => {
    setChartData(revenuePayload.revenueChart);
  }, [revenuePayload.revenueChart]);
  return (
    <div className="revenueChartContainer">
      <div className="revenueChartTitle">{title}</div>
      <DropList
        width="300px"
        title={"Select type"}
        indexSelected={0}
        labels={["Day", "Month", "Year"]}
        values={["day", "month", "year"]}
        onChangeValue={(value) => setTimeType(value)}
      />
      <ResponsiveContainer width="100%" aspect={aspect}>
        {chartData ? (
          <AreaChart
            width={730}
            height={250}
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        ) : (
          <></>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
