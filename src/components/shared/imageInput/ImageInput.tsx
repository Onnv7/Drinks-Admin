import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./imageinput.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type Props = {
  height?: number;
  width?: number;
  file?: File;
  isClearAfterUpload?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ImageInput: React.FC<Props> = (props) => {
  const {
    height = 300,
    width = 300,
    onChange,
    file,
    isClearAfterUpload = false,
  } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [imagePath, setImagePath] = useState<string | null>(null);
  const [fileName, setFileName] = useState("No selected file");

  const handleClick = (): void => {
    inputRef.current?.click();
  };

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
    height: `${height}px`,
    width: `${width}px`,
  };
  const styleDesImage = {
    width: `${width}px`,
  };
  useEffect(() => {
    if (file) {
      setFileName(file!.name);
      if (file) {
        setImagePath(URL.createObjectURL(file));
        // if (onChange) {
        //   onChange();
        // }
      }
    }
  }, [file]);
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
        {imagePath ? (
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

export default ImageInput;
