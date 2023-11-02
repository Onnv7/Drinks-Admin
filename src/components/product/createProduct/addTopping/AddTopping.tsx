import React, { useState } from "react";
import SizeItem from "../sizeItem/SizeItem";

import "./addtopping.scss";
import { v4 as uuidv4 } from "uuid";
import { ITopping } from "../../../../interfaces/model/topping";
import TextInput from "../../../shared/textInput/TextInput";
import ElevatedButton from "../../../shared/elevatedButton/ElevatedButton";
import { toppingSchema } from "../../../../validators/ProductValidateSchema";
import useValidator from "../../../../validators/useValidator";

type Props = {
  value?: ITopping[];
  onAddItem?: (item: ITopping) => void;
  onDeleteItem?: (item: string) => void;
};

const AddTopping: React.FC<Props> = (props) => {
  const { value = [], onAddItem, onDeleteItem } = props;
  const initialTopping = {
    name: "",
    price: NaN,
  };
  const [toppingInfo, setToppingInfo] = useState<ITopping>(initialTopping);
  const [error, setError] = useState("");
  const { errors, validate } = useValidator(toppingSchema);
  const onAddBtnClick = () => {
    const result = validate(toppingInfo!);
    console.log(
      "🚀 ~ file: AddTopping.tsx:26 ~ onAddBtnClick ~ result:",
      result,
      errors
    );

    if (!result) {
      return;
    }

    if (value.find((it) => it.name === toppingInfo?.name)) {
      setToppingInfo(initialTopping);
      setError(`Already have topping ${toppingInfo?.name}`);
      return;
    }

    if (toppingInfo !== null && onAddItem) {
      onAddItem(toppingInfo);
    }

    setToppingInfo(initialTopping);
  };

  const onDeleteBtnClick = (name: string) => {
    setError("");
    if (onDeleteItem) {
      onDeleteItem(name);
    }
  };
  return (
    <div className="toppingInputCol">
      {value?.length > 0 && (
        <div className="toppingList">
          {value &&
            value.map((item) => {
              return (
                <SizeItem
                  key={uuidv4()}
                  name={["Name", "Topping"]}
                  value={[item.name, item.price]}
                  onDelete={() => onDeleteBtnClick(item.name)}
                />
              );
            })}
        </div>
      )}
      <div className="addToppingContainer">
        {error !== "" && <div className="errorToppingInput">*{error}</div>}
        <div className="toppingInput">
          <TextInput
            height="48px"
            width="200px"
            placeHolderText="Topping name"
            value={toppingInfo?.name ? toppingInfo?.name : ""}
            onChange={(e) =>
              setToppingInfo({
                ...toppingInfo,
                name: (e.target as HTMLInputElement).value,
              } as ITopping)
            }
            errorMessage={errors.name}
          />
          <TextInput
            height="48px"
            width="200px"
            placeHolderText="Topping price"
            type="number"
            value={toppingInfo?.price ? toppingInfo?.price?.toString() : ""}
            onChange={(e) =>
              setToppingInfo({
                ...toppingInfo,
                price: parseFloat((e.target as HTMLInputElement).value),
              } as ITopping)
            }
            errorMessage={errors.price}
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
