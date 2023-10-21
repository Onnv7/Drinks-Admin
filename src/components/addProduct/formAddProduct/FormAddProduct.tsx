import React, { FormEvent } from "react";
import "./formaddproduct.scss";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import ImageInput from "../../shared/imageInput/ImageInput";
import TextInput from "../../shared/textInput/TextInput";
import SizeItem from "../sizeItem/SizeItem";
import AddSize from "../addSize/AddSize";
import AddTopping from "../addTopping/AddTopping";
import AddImage from "../addImage/AddImage";

const FormAddProduct: React.FC = () => {
  const onSubmit = () => {
    console.log("submit");
  };
  return (
    <form className="formContainer">
      <div className="productTitle">Product info</div>
      <div className="productInfo">
        <div className="productName productField">
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
          <AddSize />
        </div>

        <div className="productTopping productField">
          <label className="productFieldTitle">Topping: </label>
          <AddTopping />
        </div>

        <div className="productImages productField">
          <label className="productFieldTitle">Images: </label>
          <AddImage />
        </div>
      </div>
      <div className="submitCreateProduct" onClick={onSubmit}>
        <ElevatedButton text="Submit" width={300} borderRadius={20} />
      </div>
    </form>
  );
};

export default FormAddProduct;
