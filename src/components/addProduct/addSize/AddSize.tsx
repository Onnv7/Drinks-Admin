import React, { useState } from "react";
import SizeItem from "../sizeItem/SizeItem";
import TextInput from "../../shared/textInput/TextInput";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import "./addsize.scss";
import { v4 as uuidv4 } from "uuid";

type SizeItemType = {
  size: string;
  price: number;
};

const AddSize: React.FC = () => {
  const [sizeList, setSizeList] = useState<SizeItemType[]>([]);

  const [sizeInfo, setSizeInfo] = useState<SizeItemType | null>(null);
  const [error, setError] = useState("");
  const onAddBtnClick = () => {
    if (sizeList.find((it) => it.size === sizeInfo?.size)) {
      setSizeInfo(null);
      setError(`Already have size ${sizeInfo?.size}`);
      return;
    }
    setError("");
    if (sizeInfo != null) {
      setSizeList((prev) => {
        return [...prev, sizeInfo];
      });
    }
    setSizeInfo(null);
  };

  const onDeleteItem = (size: string) => {
    setError("");
    setSizeList((prev) => {
      return prev.filter((it, i) => it.size !== size);
    });
  };
  return (
    <div className="sizeInputCol">
      {sizeList.length > 0 && (
        <div className="sizeList">
          {sizeList &&
            sizeList.map((item) => {
              return (
                <SizeItem
                  key={uuidv4()}
                  name={["Size", "Price"]}
                  value={[item.size, item.price]}
                  onDelete={() => onDeleteItem(item.size)}
                />
              );
            })}
        </div>
      )}
      <div className="addSizeContainer">
        {error !== "" && <div className="errorSizeInput">*{error}</div>}
        <div className="sizeInput">
          <TextInput
            height={48}
            width={200}
            placeHolderText="Product size"
            value={sizeInfo?.size ? sizeInfo?.size : ""}
            onChange={(e) =>
              setSizeInfo({
                ...sizeInfo,
                size: (e.target as HTMLInputElement).value,
              } as SizeItemType)
            }
          />
          <TextInput
            height={48}
            width={200}
            placeHolderText="Product price"
            type="number"
            value={sizeInfo?.price ? sizeInfo?.price?.toString() : ""}
            onChange={(e) =>
              setSizeInfo({
                ...sizeInfo,
                price: parseFloat((e.target as HTMLInputElement).value),
              } as SizeItemType)
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
