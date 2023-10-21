import React, { useState } from "react";
import SizeItem from "../sizeItem/SizeItem";
import TextInput from "../../shared/textInput/TextInput";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import "./addtopping.scss";
import { v4 as uuidv4 } from "uuid";
import { ITopping } from "../../../interfaces/topping";

const AddTopping: React.FC = () => {
  const [toppingList, setToppingList] = useState<ITopping[]>([]);

  const [toppingInfo, setToppingInfo] = useState<ITopping | null>(null);
  const [error, setError] = useState("");
  const onAddBtnClick = () => {
    if (toppingList.find((it) => it.name === toppingInfo?.name)) {
      setToppingInfo(null);
      setError(`Already have size ${toppingInfo?.name}`);
      return;
    }
    setError("");
    if (toppingInfo != null) {
      setToppingList((prev) => {
        return [...prev, toppingInfo];
      });
    }
    setToppingInfo(null);
  };

  const onDeleteItem = (name: string) => {
    setError("");
    setToppingList((prev) => {
      return prev.filter((it, i) => it.name !== name);
    });
  };
  return (
    <div className="toppingInputCol">
      {toppingList.length > 0 && (
        <div className="toppingList">
          {toppingList &&
            toppingList.map((item) => {
              return (
                <SizeItem
                  key={uuidv4()}
                  name={["Name", "Price"]}
                  value={[item.name, item.price]}
                  onDelete={() => onDeleteItem(item.name)}
                />
              );
            })}
        </div>
      )}
      <div className="addToppingContainer">
        {error !== "" && <div className="errorToppingInput">*{error}</div>}
        <div className="toppingInput">
          <TextInput
            height={48}
            width={200}
            placeHolderText="Topping name"
            value={toppingInfo?.name ? toppingInfo?.name : ""}
            onChange={(e) =>
              setToppingInfo({
                ...toppingInfo,
                name: (e.target as HTMLInputElement).value,
              } as ITopping)
            }
          />
          <TextInput
            height={48}
            width={200}
            placeHolderText="Topping price"
            type="number"
            value={toppingInfo?.price ? toppingInfo?.price?.toString() : ""}
            onChange={(e) =>
              setToppingInfo({
                ...toppingInfo,
                price: parseFloat((e.target as HTMLInputElement).value),
              } as ITopping)
            }
          />
          <div className="btnAdd" onClick={onAddBtnClick}>
            <ElevatedButton text="Add" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTopping;
