import { Button } from "@mui/material";
import { useEffect } from "react";
import { storageManager } from "../../helper/storager";

const Dashboard = () => {
  useEffect(() => {
    const userId = storageManager.getUserId();
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
