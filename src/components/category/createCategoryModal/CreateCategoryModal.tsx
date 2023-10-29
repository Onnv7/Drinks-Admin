import React, { useEffect, useState } from "react";
import "./createcategorymodal.scss";
import ImageInput from "../../shared/imageInput/ImageInput";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import TextInput from "../../shared/textInput/TextInput";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import { createCategory } from "../../../services/redux/slices/category.slice";
import { ICreateCategoryReq } from "../../../interfaces/request/category.request";
import { useSelector } from "react-redux";
import { categorySelector } from "../../../services/redux/selecters/selector";

type Props = {
  onClose: () => void;
};

const CreateCategoryModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const categoryPayload = useSelector(categorySelector);
  const { onClose } = props;
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const onCreateCategory = async () => {
    await dispatch(
      createCategory({
        name: name,
        image: image,
      } as ICreateCategoryReq)
    );
  };

  useEffect(() => {
    if (categoryPayload.succeed === true) {
      onClose();
    }
  }, [categoryPayload.succeed, onClose]);
  return (
    <div className="createCategoryModalContainer">
      {/* {categoryPayload.loading && <Loading />} */}
      <div className="createCategoryModalCard">
        <div className="closeIconCreateCategoryModal" onClick={onClose}>
          <CloseRoundedIcon />
        </div>
        <div className="createCategoryThumbnailModal">
          <ImageInput
            file={image}
            onChange={(e) => setImage(e.target.files![0])}
          />
        </div>
        <div className="createCategoryModalName">
          <TextInput
            height="48px"
            type="text"
            placeHolderText="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <ElevatedButton
          text="Create Category"
          borderRadius={30}
          onClick={onCreateCategory}
        />
      </div>
    </div>
  );
};

export default CreateCategoryModal;
