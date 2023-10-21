import React from "react";
import "./elevatedbutton.scss";
import { ColorConstants } from "../../../constants/ColorConstant";

type Props = {
  text: string;
  icon?: string;
  color?: string;
  backgroundColor?: string;
  height?: number;
  width?: number;
  onClick?: () => void;
  borderRadius?: number;
};

const ElevatedButton: React.FC<Props> = (props) => {
  const handleClick = () => {
    if (onClick != null) {
      onClick();
    }
  };
  const {
    text,
    color = ColorConstants.white,
    icon,
    onClick,
    backgroundColor = ColorConstants.bluePositive,
    height,
    width,
    borderRadius,
  } = props;

  const style = {
    color: color,
    backgroundColor: backgroundColor,
    height: `${height}px`,
    width: `${width}px`,
    borderRadius: `${borderRadius}px`,
  };

  return (
    <div className="elevatedBtnContainer" style={style} onClick={handleClick}>
      {props.icon && <i className={icon}></i>}
      <div className="content">{text}</div>
    </div>
  );
};

export default ElevatedButton;
