import React, { useEffect, useState } from "react";
import Loading from "../../shared/loading/Loading";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import TextInput from "../../shared/textInput/TextInput";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import { categorySelector } from "../../../services/redux/selecters/selector";
import ElevatedButton from "../../shared/elevatedButton/ElevatedButton";
import "./updatecategorymodal.scss";
import { ICategory } from "../../../interfaces/model/category";
import ImageUrlInput from "../../shared/imageUrlInput/ImageUrlInput";
import { IUpdateCategoryReq } from "../../../interfaces/request/category.request";
import { updateCategory } from "../../../services/redux/slices/category.slice";
import DropList from "../../shared/dropList/DropList";
import { toaster } from "../../../helper/toaster";

type Props = {
  onClose: () => void;
  category: ICategory;
};

const UpdateCategoryModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const categoryPayload = useSelector(categorySelector);
  const { onClose, category } = props;

  const [item, setItem] = useState<IUpdateCategoryReq>({
    name: category.name,
    enabled: category.enabled,
  });

  const handleUpdateCategoryClick = async () => {
    await dispatch(updateCategory({ category: item, id: category.id }));
    onClose();
  };

  return (
    <div className="viewCategoryModalContainer">
      {/* {categoryPayload.loading && <Loading />} */}
      <div className="viewCategoryModalCard">
        <div className="viewCategoryModalCloseIcon" onClick={onClose}>
          <CloseRoundedIcon />
        </div>
        <div className="viewCategoryThumbnailModal">
          <ImageUrlInput
            url={category.image.url}
            onChange={(e) => {
              setItem((prev) => {
                if (e.target.files![0])
                  return { ...prev, image: e.target.files![0] };
                else {
                  return prev;
                }
              });
            }}
          />
        </div>
        <div className="viewCategoryModalName">
          <TextInput
            height="48px"
            type="text"
            placeHolderText="Category name"
            value={item.name}
            onChange={(e) => {
              setItem((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
        </div>
        <div className="viewCategoryModalStatus">
          <DropList
            title="Select status"
            labels={["Enable", "Disable"]}
            values={[true, false]}
            indexSelected={["Enable", "Disable"].findIndex((it) => {
              const status = category.enabled ? "Enable" : "Disable";
              return it === status;
            })}
            // onChangeSelected={(index) => {
            //   setItem((prev) => {
            //     return {
            //       ...prev,
            //       enabled:
            //         ["Enable", "Disable"][index] === "Enable" ? true : false,
            //     };
            //   });
            // }}
            onChangeValue={(value: any) => {
              setItem((prev) => {
                return {
                  ...prev,
                  enabled: value,
                };
              });
            }}
          />
        </div>

        <ElevatedButton
          text="Create Category"
          borderRadius={30}
          onClick={handleUpdateCategoryClick}
        />
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
