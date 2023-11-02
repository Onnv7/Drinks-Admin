import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { storageManager } from "../../helper/storager";
import "./dashboard.scss";
import Chart from "../../components/dashboard/chart/Chart";
import RevenueTag from "../../components/category/revenueTag/RevenueTag";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import {
  getCanceledOrderQuantity,
  getRevenueToday,
  getSucceedOrderQuantity,
} from "../../services/redux/slices/revenue.slice";
import { useSelector } from "react-redux";
import { revenueSelector } from "../../services/redux/selecters/selector";
import { ColorConstants } from "../../constants/ColorConstant";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const revenuePayload = useSelector(revenueSelector);
  const [succeedOrder, setSucceedOrder] = useState(
    revenuePayload.succeedOrderStatistic
  );
  const [canceledOrder, setCanceledOrder] = useState(
    revenuePayload.canceledOrderStatistic
  );
  const [revenueToday, setRevenueToday] = useState(revenuePayload.revenueToday);
  useEffect(() => {
    dispatch(getSucceedOrderQuantity());
    dispatch(getCanceledOrderQuantity());
    dispatch(getRevenueToday());
  }, [dispatch]);

  useEffect(() => {
    setCanceledOrder(revenuePayload.canceledOrderStatistic);
    setSucceedOrder(revenuePayload.succeedOrderStatistic);
    setRevenueToday(revenuePayload.revenueToday);
  }, [
    revenuePayload.canceledOrderStatistic,
    revenuePayload.revenueToday,
    revenuePayload.succeedOrderStatistic,
  ]);

  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <div className="dashboardTitle">Dashboard</div>
      </div>
      <div className="dashboardBody">
        <div className="dashboardRevenueStatistic">
          <div className="dashboardRevenueStatisticTitle">Statistic</div>
          <div className="dashboardRevenueStatisticContent">
            <div className="dashboardRevenueTag">
              <RevenueTag
                title={"Succeed Orders"}
                content={`${succeedOrder?.orderQuantity}`}
                subContent={`${succeedOrder?.difference}`}
                subContentColor={
                  succeedOrder?.difference && succeedOrder?.difference < 0
                    ? "red"
                    : "green"
                }
                iconColor="green"
                icon={<CheckCircleOutlineRoundedIcon />}
              />
            </div>
            <div className="dashboardRevenueTag">
              <RevenueTag
                title={"Canceled Orders"}
                content={`${canceledOrder?.orderQuantity}`}
                subContent={`${canceledOrder?.difference}`}
                subContentColor={
                  canceledOrder?.difference && canceledOrder?.difference < 0
                    ? "red"
                    : "green"
                }
                iconColor="red"
                icon={<HighlightOffRoundedIcon />}
              />
            </div>
            <div className="dashboardRevenueTag">
              <RevenueTag
                title={"Revenue today"}
                content={`$${revenueToday?.revenue}`}
                subContent={`${revenueToday?.ratio}%`}
                subContentColor={
                  revenueToday?.ratio && revenueToday?.ratio < 0
                    ? "red"
                    : "green"
                }
                iconColor={ColorConstants.primary}
                icon={<PaidRoundedIcon />}
              />
            </div>
          </div>
        </div>
        <div className="dashboardRevenueChart">
          <Chart title="Revenue chart" aspect={4 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
