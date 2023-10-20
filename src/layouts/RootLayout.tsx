import React from "react";
import SideBar from "../components/shared/sidebar/SideBar";
import TopBar from "../components/shared/topbar/TopBar";
import { Outlet } from "react-router-dom";
import "./rootlayout.scss";

const RootLayout: React.FC = () => {
  return (
    <>
      <SideBar />
      <div className="rootContainer">
        <TopBar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
