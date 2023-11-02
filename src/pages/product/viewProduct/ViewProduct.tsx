import React, { useEffect } from "react";
import "./viewproduct.scss";
import { useParams } from "react-router-dom";
import FormViewProduct from "../../../components/product/viewProduct/formViewProduct/FormViewProduct";

import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import { getProductDetailsById } from "../../../services/redux/slices/product.slice";
import { selectItemBar } from "../../../services/redux/slices/sidebar.slice";

const ViewProduct: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getProductDetailsById(id!));
      dispatch(selectItemBar("product"));
    };

    loadData();
  }, [dispatch, id]);
  return (
    <div className="viewProductContainer">
      <div className="viewProductTitle">Product: {id}</div>
      <div className="viewProductFormContainer">
        <FormViewProduct />
      </div>
    </div>
  );
};

export default ViewProduct;
