import React from "react";
import "./sidebar.scss";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import { Link } from "react-router-dom";

const SideBar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Admin</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" className="link">
            <li>
              <GridViewTwoToneIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/product" className="link">
            <li>
              <Inventory2TwoToneIcon className="icon" />
              <span>Product</span>
            </li>
          </Link>

          <Link to="/category" className="link">
            <li>
              <CategoryTwoToneIcon className="icon" />
              <span>Category</span>
            </li>
          </Link>
          <p className="title">EMPLOYEE</p>
          <Link to="/category" className="link">
            <li>
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
