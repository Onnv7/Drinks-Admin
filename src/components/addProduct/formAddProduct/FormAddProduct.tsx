import React from "react";
import "./formaddproduct.scss";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import ImageInput from "../../shared/imageInput/ImageInput";
import TextInput from "../../shared/textInput/TextInput";
import SizeItem from "../sizeItem/SizeItem";

const FormAddProduct: React.FC = () => {
  const onAddNewSize = () => {};

  return (
    <div className="formContainer">
      <div className="productTitle">Product info</div>
      <div className="productInfo productField">
        <div className="productName ">
          <label className="productFieldTitle">Name: </label>
          <TextInput height={48} placeHolderText="Product's name" />
        </div>
        <div className="productPrice productField">
          <label className="productFieldTitle">Price: </label>
          <TextInput
            height={48}
            placeHolderText="Product's price"
            type="number"
          />
        </div>
        <div className="productThumbnail productField">
          <label className="productFieldTitle">Thumbnail: </label>
          <ImageInput height={300} width={300} />
        </div>

        <div className="productSize productField">
          <label className="productFieldTitle">Size: </label>
          <div className="contentCol">
            <div className="sizeList">
              <SizeItem size="123" price={12} />
              <SizeItem size="123" price={12} />
            </div>
            <div className="addSizeContainer">
              <div className="input">
                <TextInput
                  height={48}
                  width={200}
                  placeHolderText="Product Size"
                />
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
        </div>
        <SizeItem size="123" price={12} />
      </div>
      <div className="toppingTitle">Topping info</div>
      <div className="toppingInfo">
        <div>thum</div>
      </div>
      <div className="imageInfo"></div>

      <span>asdas</span>
      <span>asdas</span>
    </div>
  );
};

export default FormAddProduct;
