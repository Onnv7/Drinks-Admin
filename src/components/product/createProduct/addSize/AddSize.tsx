import React, { useState } from "react";
import SizeItem from "../sizeItem/SizeItem";

import "./addsize.scss";
import { v4 as uuidv4 } from "uuid";
import { ISize } from "../../../../interfaces/model/size";
import TextInput from "../../../shared/textInput/TextInput";
import ElevatedButton from "../../../shared/elevatedButton/ElevatedButton";

type Props = {
  value?: ISize[];
  onAddItem?: (item: ISize) => void;
  onDeleteItem?: (item: string) => void;
};

const AddSize: React.FC<Props> = (props) => {
  const { value = [], onAddItem, onDeleteItem } = props;

  const [sizeInfo, setSizeInfo] = useState<ISize | null>(null);
  const [error, setError] = useState("");

  const onAddBtnClick = () => {
    setError("");
    if (value?.find((it) => it.size === sizeInfo?.size)) {
      setSizeInfo(null);
      setError(`Already have size ${sizeInfo?.size}`);
      return;
    }
    if (sizeInfo != null && onAddItem) {
      onAddItem(sizeInfo);
    }
    setSizeInfo(null);
  };

  const onDeleteBtnClick = (size: string) => {
    setError("");
    if (onDeleteItem) {
      onDeleteItem(size);
    }
  };

  return (
    <div className="sizeInputCol">
      {value.length > 0 && (
        <div className="sizeList">
          {value &&
            value.map((item) => {
              return (
                <SizeItem
                  key={uuidv4()}
                  name={["Size", "Price"]}
                  value={[item.size, item.price]}
                  onDelete={() => onDeleteBtnClick(item.size)}
                />
              );
            })}
        </div>
      )}
      <div className="addSizeContainer">
        {error !== "" && <div className="errorSizeInput">*{error}</div>}
        <div className="sizeInput">
          <TextInput
            height="48px"
            width="200px"
            placeHolderText="Product size"
            value={sizeInfo?.size ? sizeInfo?.size : ""}
            onChange={(e) =>
              setSizeInfo({
                ...sizeInfo,
                size: (e.target as HTMLInputElement).value,
              } as ISize)
            }
          />
          <TextInput
            height="48px"
            width="200px"
            placeHolderText="Product price"
            type="number"
            value={sizeInfo?.price ? sizeInfo?.price?.toString() : ""}
            onChange={(e) =>
              setSizeInfo({
                ...sizeInfo,
                price: parseFloat((e.target as HTMLInputElement).value),
              } as ISize)
            }
          />
          <div onClick={onAddBtnClick}>
            <ElevatedButton text="Add" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSize;
