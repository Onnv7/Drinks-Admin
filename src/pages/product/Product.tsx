import React, { useEffect } from "react";
import "./product.scss";
import { Link } from "react-router-dom";
import ProductTable from "../../components/product/table/ProductTable";
import { IProduct } from "../../interfaces/product";
import OutLineButton from "../../components/shared/outlineButton/OutLineButton";
import { RouteConstants } from "../../constants/RouteConstant";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { getAllProduct } from "../../services/redux/slices/product.slice";
import { useSelector } from "react-redux";
import { productSelector } from "../../services/redux/selecters/selector";

const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const productPayload = useSelector(productSelector);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getAllProduct());
    };
    loadData();
  }, [dispatch]);

  return (
    <div className="productContainer">
      <div className="productHeader">
        <div className="productTitle">PRODUCT TABLE</div>
        <div className="productAddButton">
          <Link to={RouteConstants.ADD_PRODUCT_PATH}>
            <OutLineButton text="Add new product" backgroundColor="#1ad0ec27" />
          </Link>
        </div>
      </div>
      <div className="productContent">
        <div className="productTable">
          <ProductTable product={productPayload.table} />
        </div>
      </div>
    </div>
  );
};

export default Product;
