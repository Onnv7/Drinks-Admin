import React, { useEffect } from "react";
import "./createproduct.scss";
import FormCreateProduct from "../../../components/product/createProduct/formAddProduct/FormCreateProduct";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import { selectItemBar } from "../../../services/redux/slices/sidebar.slice";

const CreateProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(selectItemBar("product"));
  }, [dispatch]);
  return (
    <div className="addProductContainer">
      <div className="addProductTitle">Add new Product</div>
      <div className="formProduct">
        <FormCreateProduct />
      </div>
    </div>
  );
};

export default CreateProduct;
