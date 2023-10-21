import React from "react";
import "./sizeitem.scss";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
type Props = {
  name: string[];
  value: (number | string)[];
  onDelete?: () => void;
};

const SizeItem: React.FC<Props> = (props) => {
  const { name, value, onDelete } = props;
  return (
    <div className="sizeItemContainer">
      <div className="removeSizeBtn" onClick={onDelete}>
        <RemoveCircleOutlineIcon />
      </div>
      {value &&
        value.map((it, index) => {
          return (
            <div className="size">
              {name[index]} {it}
            </div>
          );
        })}

      {/* <div className="price">{value} {value}</div> */}
    </div>
  );
};

export default SizeItem;
