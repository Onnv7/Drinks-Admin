import React from "react";
import "./modalyesno.scss";
import ElevatedButton from "../elevatedButton/ElevatedButton";
import OutLineButton from "../outlineButton/OutLineButton";
import { ColorConstants } from "../../../constants/ColorConstant";

type Props = {
  title: string;
  content: string;
  width?: string;
  height?: string;
  onYesClick: () => void;
  onNoClick: () => void;
  onClose: () => void;
  onCloseWhenClickOutSite?: boolean;
};

const ModalYesNo: React.FC<Props> = (props) => {
  const {
    title,
    content,
    onYesClick,
    onNoClick,
    onClose,
    onCloseWhenClickOutSite = true,
    width = "60vw",
    height = "500px",
  } = props;
  const containerStyle = {
    width: width,
    height: height,
  };
  return (
    <div
      className="backgroundModalYesNo"
      onClick={() => {
        if (onCloseWhenClickOutSite) onClose();
      }}
    >
      <div
        className="modalYesNoContainer"
        style={containerStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modalYesNoTitle">{title}</div>

        <div className="modalYesNoBody">
          <div className="modalYesNoContent">{content}</div>

          <div className="modalYesNoWrapButton">
            <OutLineButton
              text="No"
              width="100px"
              height="40px"
              color={ColorConstants.bluePositive}
              onClick={() => onNoClick()}
            />
            <span style={{ margin: "12px" }}></span>
            <ElevatedButton
              text="Yes"
              width="100px"
              height="40px"
              backgroundColor={ColorConstants.redNegative}
              onClick={() => {
                onYesClick();
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalYesNo;
