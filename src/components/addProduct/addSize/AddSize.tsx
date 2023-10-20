import React from "react";
import SizeItem from "../sizeItem/SizeItem";
import TextInput from "../../shared/textInput/TextInput";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import "./addsize.scss";

const AddSize: React.FC = () => {
  return (
    <div className="contentCol">
      <div className="sizeList">
        <SizeItem size="123" price={12} />
        <SizeItem size="123" price={12} />
      </div>
      <div className="addSizeContainer">
        <div className="input">
          <TextInput height={48} width={200} placeHolderText="Product Size" />
          <TextInput
            height={48}
            width={200}
            placeHolderText="Product Size"
            type="number"
          />
          <div className="btnAdd">
            <ElevatedButton text="Add" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSize;
