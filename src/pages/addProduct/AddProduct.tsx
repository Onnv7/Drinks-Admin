import React from "react";
import "./addproduct.scss";
import FormAddProduct from "../../components/addProduct/formAddProduct/FormAddProduct";
const AddProduct: React.FC = () => {
  return (
    <div className="addProductContainer">
      <div className="title">Add new Product</div>
      <div className="formProduct">
        <FormAddProduct />
      </div>
    </div>
  );
};

export default AddProduct;
