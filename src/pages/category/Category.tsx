import React, { useState } from "react";
import "./category.scss";
import { Link } from "react-router-dom";

import OutLineButton from "../../components/shared/outlineButton/OutLineButton";
import { RouteConstants } from "../../constants/RouteConstant";
import { ICategory } from "../../interfaces/category";
import CategoryTable from "../../components/category/categoryTable/CategoryTable";
import CategoryModal from "../../components/category/modal/CategoryModal";

const Category: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const rows: ICategory[] = [
    {
      id: "1",
      name: "Snow",
      thumbnailUrl:
        "https://i.pinimg.com/564x/1d/2e/6b/1d2e6b51223c0bad567d946d2d7c2fb8.jpg",
    },
    {
      id: "2",
      name: "Snow 2",
      thumbnailUrl:
        "https://i.pinimg.com/564x/1d/2e/6b/1d2e6b51223c0bad567d946d2d7c2fb8.jpg",
    },
  ];

  const onSwitchModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="categoryContainer">
      {openModal && <CategoryModal onClose={onSwitchModal} />}
      <div className="categoryHeader">
        <div className="title">Category Table</div>

        <OutLineButton text="Add new category" onClick={onSwitchModal} />
      </div>
      <div className="categoryContent">
        <div className="categoryTable">
          <CategoryTable category={rows} />
        </div>
      </div>
    </div>
  );
};

export default Category;
