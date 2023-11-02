import React, { useState } from "react";
import "./sidebar.scss";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import { Link } from "react-router-dom";

const SideBar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("dashboard");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
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
        </ul>
      </div>
      <div className="bottom">Fotter</div>
    </div>
  );
};

export default SideBar;
