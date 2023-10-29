import React, { useEffect, useState } from "react";
import "./category.scss";
import OutLineButton from "../../components/shared/outlineButton/OutLineButton";
import CategoryTable from "../../components/category/categoryTable/CategoryTable";
import CreateCategoryModal from "../../components/category/createCategoryModal/CreateCategoryModal";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import {
  clearStatusCategory,
  getAllCategory,
} from "../../services/redux/slices/category.slice";
import { useSelector } from "react-redux";
import { categorySelector } from "../../services/redux/selecters/selector";
import Loading from "../../components/shared/loading/Loading";

const Category: React.FC = () => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const categoryPayload = useSelector(categorySelector);

  const onSwitchModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getAllCategory());
      // dispatch(clearStatusCategory());
    };
    loadData();
  }, [dispatch]);

  return (
    <div className="categoryContainer">
      {/* {categoryPayload.loading && <Loading />} */}
      {openModal && <CreateCategoryModal onClose={onSwitchModal} />}
      <div className="categoryHeader">
        <div className="title">CATEGORY TABLE</div>
        <div className="addButtonCategory">
          <OutLineButton
            text="Add new category"
            onClick={onSwitchModal}
            backgroundColor="#1ad0ec27"
          />
        </div>
      </div>
      <div className="categoryContent">
        <div className="categoryTable">
          <CategoryTable categoryList={categoryPayload.categories} />
        </div>
      </div>
    </div>
  );
};

export default Category;
