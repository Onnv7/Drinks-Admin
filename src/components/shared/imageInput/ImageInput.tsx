import React, { ChangeEvent, useRef, useState } from "react";
import "./imageinput.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type Props = {
  height: number;
  width: number;
  onChange?: (file: File | null) => void;
};

const ImageInput: React.FC<Props> = (props) => {
  const { height, width, onChange } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("No selected file");

  const handleClick = (): void => {
    inputRef.current?.click();
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    file && setFileName(file.name);
    if (file) {
      setImage(URL.createObjectURL(file));
      if (onChange) {
        onChange(file);
      }
    }
  };
  const onClickRemoveImage = (): void => {
    setImage(null);
    setFileName("No selected file");
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const stylePreviewImage = {
    height: `${height}px`,
    width: `${width}px`,
  };
  const styleDesImage = {
    width: `${width}px`,
  };
  return (
    <div className="imageInputContainer">
      <input
        id="file-input"
        ref={inputRef}
        type="file"
        accept="image/*"
        className="imageFile"
        title="Upload"
        onChange={onChangeFile}
        hidden
      />
      <div
        className="imageSelect"
        onClick={handleClick}
        style={stylePreviewImage}
      >
        {image ? (
          <img className="previewImage" src={image} alt="Thumbnail product" />
        ) : (
          <img src="/assets/image/icon-upload-image.png" alt="" />
        )}
      </div>
      <div className="desImage" style={styleDesImage}>
        <div className="fileName">{fileName}</div>
        <i className="iconDelete" onClick={onClickRemoveImage}>
          <HighlightOffIcon />
        </i>
      </div>
    </div>
  );
};

export default ImageInput;
