import React from "react";
import "./product.scss";
import { Link } from "react-router-dom";
import ProductTable from "../../components/product/table/ProductTable";
import { IProduct } from "../../interfaces/product";
import OutLineButton from "../../components/shared/outlineButton/OutLineButton";
import { RouteConstants } from "../../constants/RouteConstant";

const Product: React.FC = () => {
  const rows: IProduct[] = [
    { id: "1", name: "Snow", thumbnailUrl: "Jon", price: 35 },

    { id: "2", name: "Snow", thumbnailUrl: "Jon", price: 35 },

    { id: "3", name: "Snow", thumbnailUrl: "Jon", price: 35 },

    { id: "4", name: "Snow", thumbnailUrl: "Jon", price: 35 },

    { id: "5", name: "Snow", thumbnailUrl: "Jon", price: 35 },
    { id: "6", name: "Snow", thumbnailUrl: "Jon", price: 35 },
    { id: "7", name: "Snow", thumbnailUrl: "Jon", price: 35 },
    { id: "8", name: "Snow", thumbnailUrl: "Jon", price: 35 },
    { id: "9", name: "Snow", thumbnailUrl: "Jon", price: 35 },
    { id: "10", name: "Snow", thumbnailUrl: "Jon", price: 35 },
  ];
  return (
    <div className="productContainer">
      <div className="productHeader">
        <div className="title">Product Table</div>
        <Link to={RouteConstants.ADD_PRODUCT_PATH}>
          <OutLineButton text="Add new product" />
        </Link>
      </div>
      <div className="productContent">
        <div className="productTable">
          <ProductTable product={rows} />
        </div>
      </div>
    </div>
  );
};

export default Product;
