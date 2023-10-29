import React, { ChangeEvent, useRef, useState } from "react";
import "./imageurlinput.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type Props = {
  height?: string;
  width?: string;
  url: string | null;
  isClearAfterUpload?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
const ImageUrlInput: React.FC<Props> = (props) => {
  const {
    url,
    height = 300,
    width = 300,
    onChange,
    isClearAfterUpload,
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [fileName, setFileName] = useState("No selected file");

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fi = e.target?.files?.[0] ? e.target?.files?.[0] : null;

    if (fi) {
      if (onChange) {
        onChange(e);
      }
      if (isClearAfterUpload) {
        onClickRemoveImage();
        return;
      }
      setFileName(fi.name);
      setImagePath(URL.createObjectURL(fi));
    }
  };
  const onClickRemoveImage = (): void => {
    setImagePath(null);
    setFileName("No selected file");
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const stylePreviewImage = {
    height: height,
    width: width,
  };
  const styleDesImage = {
    width: width,
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
        onClick={() => inputRef.current?.click()}
        style={stylePreviewImage}
      >
        {url && !imagePath ? (
          <img className="previewImage" src={url} alt="Thumbnail product" />
        ) : imagePath ? (
          <img
            className="previewImage"
            src={imagePath}
            alt="Thumbnail product"
          />
        ) : (
          <img src="/assets/image/icon-upload-image.png" alt="" />
        )}
      </div>
      <div className="desImage" style={styleDesImage}>
        <div className="fileName">{fileName}</div>
        {imagePath && (
          <i className="iconDelete" onClick={onClickRemoveImage}>
            <HighlightOffIcon />
          </i>
        )}
      </div>
    </div>
  );
};

export default ImageUrlInput;
