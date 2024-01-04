import React, { ChangeEvent, useEffect, useState } from "react";
import "./formviewproduct.scss";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../services/redux/useTypedSelector";
import {
  categorySelector,
  productSelector,
} from "../../../../services/redux/selecters/selector";
import { IUpdateProductReq } from "../../../../interfaces/request/product.request";
import { getAllCategory } from "../../../../services/redux/slices/category.slice";
import { updateProduct } from "../../../../services/redux/slices/product.slice";

import DropList from "../../../shared/dropList/DropList";
import ElevatedButton from "../../../shared/elevatedButton/ElevatedButton";

import TextArea from "../../../shared/textArea/TextArea";
import TextInput from "../../../shared/textInput/TextInput";
import AddSize from "../../createProduct/addSize/AddSize";
import AddTopping from "../../createProduct/addTopping/AddTopping";

import { useParams } from "react-router-dom";
import ImageUrlInput from "../../../shared/imageUrlInput/ImageUrlInput";
import { updateProductSchema } from "../../../../validators/ProductValidateSchema";
import useValidator from "../../../../hooks/useValidator";

const FormViewProduct: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const categoryPayload = useSelector(categorySelector);
  const productPayload = useSelector(productSelector);
  const { errors, validate } = useValidator(updateProductSchema);

  const [rawImage, setRawImage] = useState("");

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    setItem(productPayload.updateProduct);
    setRawImage(productPayload.productDetails?.image.url ?? "");
    // const index = categoryPayload.categories.findIndex(
    //   (item) => item.id === productPayload.productDetails?.categoryId
    // );
    // setIndexCategory(index);
  }, [
    categoryPayload.categories,
    productPayload.productDetails?.categoryId,
    productPayload.productDetails?.image.url,
    productPayload.updateProduct,
  ]);
  const initialItem = {
    code: "",
    name: "",
    image: null,
    sizeList: [],
    description: "",
    toppingList: [],
    categoryId: "",
    enabled: false,
  } as IUpdateProductReq;

  const [item, setItem] = useState<IUpdateProductReq>(
    productPayload.updateProduct ?? initialItem
  );

  // event handlers =================================================================

  const handleChangeCategory = (value: any) => {
    setItem((prev) => {
      return { ...prev, categoryId: value };
    });
    // setIndexCategory(index);
  };

  const handleChangeStatus = (value: any) => {
    setItem((prev) => {
      return { ...prev, enabled: value };
    });
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const fi = e.target?.files?.[0] ? e.target?.files?.[0] : null;
    if (fi !== null) {
      setItem((prev) => {
        return { ...prev, image: fi };
      });
    }
  };

  const handleSubmit = async () => {
    const result = validate(item);
    if (result) {
      await dispatch(updateProduct({ product: item, id: id! }));
    }
  };

  return (
    <form className="formViewProductContainer">
      {/* {productPayload.loading && <Loading />} */}
      <div className="formViewProductInfo">
        <div className="productName formViewProductField">
          <label className="formViewProductFieldTitle">Name: </label>
          <TextInput
            value={item.name ?? ""}
            height="48px"
            placeHolderText="Product's name"
            onChange={(e) => {
              setItem((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
            errorMessage={errors.name}
          />
        </div>
        <div className="productEnable formViewProductField">
          <label className="formViewProductFieldTitle">Enable: </label>
          <DropList
            title={"Choose status"}
            labels={["Enabled", "Disabled"]}
            // onChangeSelected={handleChangeStatus}
            indexSelected={item.enabled ? 0 : 1}
            values={[true, false]}
            onChangeValue={handleChangeStatus}
            errorMessage={errors.categoryId}
          />
        </div>

        <div className="productThumbnail formViewProductField">
          <label className="formViewProductFieldTitle">Thumbnail: </label>
          <ImageUrlInput
            // file={item.image}
            height="300px"
            width="300px"
            onChange={handleChangeImage}
            url={rawImage}
            errorMessage={errors.image}
          />
        </div>

        <div className="formViewProductSize formViewProductField">
          <label className="formViewProductFieldTitle">Size: </label>
          <AddSize
            value={item.sizeList}
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
            errorMessage={errors.sizeList}
          />
        </div>

        <div className="productTopping formViewProductField">
          <label className="formViewProductFieldTitle">Topping: </label>
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
        <div className="productCategory formViewProductField">
          <label className="formViewProductFieldTitle">Category: </label>
          <DropList
            title="Choose category"
            labels={categoryPayload.categories.map((it) => it.name) ?? []}
            // onChangeSelected={handleChangeCategory}
            indexSelected={categoryPayload.categories.findIndex(
              (it) => it.id === item.categoryId
            )}
            values={categoryPayload.categories.map((it) => it.id) ?? []}
            onChangeValue={handleChangeCategory}
            errorMessage={errors.categoryId}
          />
        </div>

        <div className="productDescription formViewProductField">
          <label className="formViewProductFieldTitle">Description: </label>
          <div className="formViewProductDescriptionTextArea">
            <TextArea
              value={item.description}
              placeHolder="Write description..."
              width="100%"
              height="200px"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setItem((prev) => {
                  return {
                    ...prev,
                    description: e.target.value,
                  };
                });
              }}
              errorMessage={errors.description}
            />
          </div>
        </div>
      </div>
      <div className="formViewProductSizeSubmitButton" onClick={handleSubmit}>
        <ElevatedButton text="Submit" width="300px" borderRadius={20} />
      </div>
    </form>
  );
};

export default FormViewProduct;
