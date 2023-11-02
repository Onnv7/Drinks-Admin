import React, { memo } from "react";
import "./textinput.scss";

type Props = {
  height?: string;
  width?: string;
  placeHolderText?: string;
  type?: string;
  value?: string;
  errorMessage?: string;
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
    errorMessage,
    ...inputProps
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
        {...inputProps}
      />
      {errorMessage?.length! > 0 ? (
        <span className="textInputErrorMessage">{`*${errorMessage}`}</span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default memo(TextInput);
