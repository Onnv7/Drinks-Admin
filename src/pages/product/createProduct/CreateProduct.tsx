import React from "react";
import "./createproduct.scss";
import FormCreateProduct from "../../../components/product/createProduct/formAddProduct/FormCreateProduct";

const CreateProduct: React.FC = () => {
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
