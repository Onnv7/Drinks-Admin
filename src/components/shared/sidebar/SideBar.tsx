import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import { Link } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { storageManager } from "../../../helper/storager";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import { useSelector } from "react-redux";
import { sidebarSelector } from "../../../services/redux/selecters/selector";
import { selectItemBar } from "../../../services/redux/slices/sidebar.slice";

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const sidebarPayload = useSelector(sidebarSelector);
  const [selectedItem, setSelectedItem] = useState(sidebarPayload.itemName);

  const handleItemClick = (item: string) => {
    dispatch(selectItemBar(item));
  };

  useEffect(() => {
    setSelectedItem(sidebarPayload.itemName);
  }, [sidebarPayload.itemName]);

  const handleLogout = () => {
    storageManager.clearStore();
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Admin</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link
            to="/"
            className={`link`}
            onClick={() => handleItemClick("dashboard")}
          >
            <li
              className={` ${
                selectedItem === "dashboard" ? "selectedItemSidebar" : ""
              }`}
            >
              <GridViewTwoToneIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link
            to="/product"
            className={`link `}
            onClick={() => handleItemClick("product")}
          >
            <li
              className={`link ${
                selectedItem === "product" ? "selectedItemSidebar" : ""
              }`}
            >
              <Inventory2TwoToneIcon className="icon" />
              <span>Product</span>
            </li>
          </Link>

          <Link
            to="/category"
            className={`link`}
            onClick={() => handleItemClick("category")}
          >
            <li
              className={`link ${
                selectedItem === "category" ? "selectedItemSidebar" : ""
              }`}
            >
              <CategoryTwoToneIcon className="icon" />
              <span>Category</span>
            </li>
          </Link>
          <p className="title">EMPLOYEE</p>
          <Link
            to="/employee"
            className={`link`}
            onClick={() => handleItemClick("employee")}
          >
            <li
              className={`link ${
                selectedItem === "employee" ? "selectedItemSidebar" : ""
              }`}
            >
              <Groups2TwoToneIcon className="icon" />
              <span>Employee</span>
            </li>
          </Link>

          <p className="title">Other</p>
          <Link
            to="/profile"
            className={`link`}
            onClick={() => handleItemClick("profile")}
          >
            <li
              className={`link ${
                selectedItem === "profile" ? "selectedItemSidebar" : ""
              }`}
            >
              <Groups2TwoToneIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li
            onClick={() => handleLogout()}
            className={`link ${
              selectedItem === "logout" ? "selectedItemSidebar" : ""
            }`}
          >
            <LogoutRoundedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <span className="logo">Other</span>
      </div> */}
    </div>
  );
};

export default SideBar;
