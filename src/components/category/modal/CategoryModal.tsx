import React from "react";
import "./categorymodal.scss";
import ImageInput from "../../shared/imageInput/ImageInput";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import TextInput from "../../shared/textInput/TextInput";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type Props = {
  onClose: () => void;
};

const CategoryModal: React.FC<Props> = (props) => {
  const { onClose } = props;
  return (
    <div className="categoryModalContainer">
      <div className="categoryModalCard">
        <div className="closeIconCategoryModal" onClick={onClose}>
          <CloseRoundedIcon />
        </div>
        <div className="categoryThumbnailModal">
          <ImageInput />
        </div>
        <div className="categoryNameModal">
          <TextInput height={40} type="text" placeHolderText="Category name" />
        </div>
        <ElevatedButton text="Create Category" borderRadius={30} />
      </div>
    </div>
  );
};

export default CategoryModal;
