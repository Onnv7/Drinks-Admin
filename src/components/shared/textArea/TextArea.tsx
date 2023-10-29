import React, { ChangeEvent, memo } from "react";
import "./textarea.scss";

type Props = {
  placeHolder?: string;
  width?: string;
  height?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
};

const TextArea: React.FC<Props> = (props) => {
  const { width, height, placeHolder, onChange, value } = props;

  const textAreaStyle = {
    width: width,
    height: height,
  };
  return (
    <div className="textAreaContainer">
      <textarea
        className="textArea"
        style={textAreaStyle}
        placeholder={placeHolder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default memo(TextArea);
