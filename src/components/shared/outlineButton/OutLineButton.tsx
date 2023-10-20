import React from "react";
import "./outlinebutton.scss";
import { ColorConstants } from "../../../constants/ColorConstant";
type Props = {
  text: string;
  icon?: string;
  color?: string;
  onClick?: () => void;
};

const OutLineButton: React.FC<Props> = (props) => {
  const { text, icon, color = ColorConstants.bluePositive, onClick } = props;
  const handleClick = () => {
    if (onClick != null) {
      onClick();
    }
  };

  const style = {
    color: color,
    border: `1px solid ${color}`,
  };

  return (
    <div className="buttonContainer" style={style} onClick={handleClick}>
      {props.icon && <i className={icon}></i>}
      <div className="content">{text}</div>
    </div>
  );
};

export default OutLineButton;
