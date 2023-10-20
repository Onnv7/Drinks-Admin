import React from "react";
import "./textinput.scss";

type Props = {
  height?: number;
  width?: number;
  placeHolderText?: string;
  type?: string;
};

const TextInput: React.FC<Props> = (props) => {
  const { height = 30, width, placeHolderText, type = "text" } = props;

  const style = {
    height: `${height}px`,
    width: width ? `${width}px` : "100%",
  };

  return (
    <div className="textInputContainer" style={style}>
      <input type={type} className="textInput" placeholder={placeHolderText} />
    </div>
  );
};

export default TextInput;
