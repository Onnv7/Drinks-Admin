import React from "react";
import "./sizeitem.scss";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
type Props = {
  size: string;
  price: number;
};

const SizeItem: React.FC<Props> = (props) => {
  const { size, price } = props;
  return (
    <div className="sizeItemContainer">
      <div className="removeSizeBtn">
        <RemoveCircleOutlineIcon />
      </div>
      <div className="size">Size {size}</div>
      <div className="price">Price {price}</div>
    </div>
  );
};

export default SizeItem;
