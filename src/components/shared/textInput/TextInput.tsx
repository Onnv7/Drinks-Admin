import React, { ChangeEvent, memo } from "react";
import "./textinput.scss";

type Props = {
  height?: string;
  width?: string;
  placeHolderText?: string;
  type?: string;
  value?: string;
  onChange?: (e: any) => void;
};

const TextInput: React.FC<Props> = (props) => {
  const {
    height = 30,
    width,
    placeHolderText,
    type = "text",
    value,
    onChange,
  } = props;

  const style = {
    height: height,
    width: width ?? "100%",
  };

  return (
    <div className="textInputContainer" style={style}>
      <input
        type={type}
        className="textInput"
        placeholder={placeHolderText}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(TextInput);
