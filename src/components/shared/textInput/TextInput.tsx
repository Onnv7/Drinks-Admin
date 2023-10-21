import React, { ChangeEvent } from "react";
import "./textinput.scss";

type Props = {
  height?: number;
  width?: number;
  placeHolderText?: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent) => void;
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
    height: `${height}px`,
    width: width ? `${width}px` : "100%",
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

export default TextInput;
