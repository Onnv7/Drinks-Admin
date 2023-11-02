import React, { ChangeEvent, useEffect, useState } from "react";
import "./formcreateproduct.scss";

import AddSize from "../addSize/AddSize";
import AddTopping from "../addTopping/AddTopping";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../services/redux/useTypedSelector";
import {
  categorySelector,
  productSelector,
} from "../../../../services/redux/selecters/selector";
import { ICreateProductReq } from "../../../../interfaces/request/product.request";
import { getAllCategory } from "../../../../services/redux/slices/category.slice";
import { createProduct } from "../../../../services/redux/slices/product.slice";
import DropList from "../../../shared/dropList/DropList";
import ElevatedButton from "../../../shared/elevatedButton/ElevatedButton";
import ImageInput from "../../../shared/imageInput/ImageInput";
import TextArea from "../../../shared/textArea/TextArea";
import TextInput from "../../../shared/textInput/TextInput";
import useValidator from "../../../../validators/useValidator";
import { createProductSchema } from "../../../../validators/ProductValidateSchema";

const FormCreateProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const categoryPayload = useSelector(categorySelector);
  const productPayload = useSelector(productSelector);
  const [indexCategory, setIndexCategory] = useState<number | undefined>();
  const { errors, validate } = useValidator(createProductSchema);

  const initialItem = {
    name: "",
    image: null,
    sizeList: [],
    description: "",
    toppingList: [],
    categoryId: "",
  } as ICreateProductReq;
  const [item, setItem] = useState<ICreateProductReq>(initialItem);

  useEffect(() => {
    if (productPayload.succeed) {
      // Gọi hàm khi succeed thay đổi
      handleClearData();
    }
  }, [productPayload.succeed]);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  // event handlers =================================================================

  const handleChangeCategory = (value: any) => {
    setItem((prev) => {
      return { ...prev, categoryId: value };
    });
  };
  const handleChangeImage = (file: File | null) => {
    setItem((prev) => {
      return { ...prev, image: file };
    });
  };

  const handleSubmit = async () => {
    // const createProductData = (data: ICreateProductReq) => {
    //   return {
    //     name: data.name,
    //     description: data.description,
    //     categoryId: data.categoryId,
    //     sizeList: data.sizeList.map((size) => ({
    //       name: size.price,
    //       price: size.price,
    //     })),
    //   };
    // };
    const result = validate(item);
    if (result) {
      await dispatch(createProduct(item));
    }
  };

  const handleClearData = () => {
    setIndexCategory(-1);
    setItem(initialItem);
  };

  return (
    <form className="formCreateProductContainer">
      {/* {productPayload.loading && <Loading />} */}
      <div className="productInfo">
        <div className="productName productField">
          <label className="productFieldTitle">Name: </label>
          <TextInput
            value={item.name}
            height="48px"
            placeHolderText="Product's name"
            errorMessage={errors.name}
            onChange={(e) => {
              setItem((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
          />
        </div>

        <div className="productThumbnail productField">
          <label className="productFieldTitle">Image: </label>
          <ImageInput
            file={item.image}
            height="300px"
            width="300px"
            onChangeFile={handleChangeImage}
            errorMessage={errors.image}
          />
        </div>

        <div className="productSize productField">
          <label className="productFieldTitle">Size: </label>
          <AddSize
            value={item.sizeList}
            errorMessage={errors.sizeList}
            onAddItem={(it) => {
              setItem((prev) => {
                return {
                  ...prev,
                  sizeList: [...prev.sizeList, it],
                };
              });
            }}
            onDeleteItem={(size: string) => {
              setItem((prev) => {
                return {
                  ...prev,
                  sizeList: [...prev.sizeList].filter((it) => it.size !== size),
                };
              });
            }}
          />
        </div>

        <div className="productTopping productField">
          <label className="productFieldTitle">Topping: </label>
          <AddTopping
            value={item.toppingList}
            onAddItem={(it) => {
              setItem((prev) => {
                return {
                  ...prev,
                  toppingList: [...prev.toppingList, it],
                };
              });
            }}
            onDeleteItem={(name: string) => {
              setItem((prev) => {
                return {
                  ...prev,
                  toppingList: [...prev.toppingList].filter(
                    (it) => it.name !== name
                  ),
                };
              });
            }}
          />
        </div>
        <div className="productCategory productField">
          <label className="productFieldTitle">Category: </label>
          <DropList
            // indexValue={indexCategory}
            title="Choose category"
            labels={categoryPayload.categories.map((item) => item.name) ?? []}
            values={categoryPayload.categories.map((item) => item.id) ?? []}
            // onChangeSelected={handleChangeCategory}
            indexSelected={indexCategory}
            onChangeValue={handleChangeCategory}
            errorMessage={errors.categoryId}
          />
        </div>

        <div className="productDescription productField">
          <label className="productFieldTitle">Description: </label>
          <div className="productDescriptionTextArea">
            <TextArea
              value={item.description}
              placeHolder="Write description..."
              width="100%"
              height="200px"
              errorMessage={errors.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setItem((prev) => {
                  return {
                    ...prev,
                    description: e.target.value,
                  };
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="submitCreateProduct" onClick={handleSubmit}>
        <ElevatedButton text="Submit" width="300px" borderRadius={20} />
      </div>
    </form>
  );
};

export default FormCreateProduct;
