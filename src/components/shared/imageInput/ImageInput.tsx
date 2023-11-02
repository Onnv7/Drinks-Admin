import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./imageinput.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type Props = {
  height?: string;
  width?: string;
  pathValue?: string;
  file?: File | null;
  onChangeFile?: (file: File | null) => void;
  errorMessage?: string;
};

const ImageInput: React.FC<Props> = (props) => {
  const {
    height = "300px",
    width = "300px",
    onChangeFile,
    file, // dùng cho trường hợp nhiều ảnh = true
    errorMessage,
  } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [imagePath, setImagePath] = useState<string | null>(null);
  const [fileName, setFileName] = useState("No selected file");

  const handleClick = (): void => {
    inputRef.current?.click();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fi = e.target?.files?.[0] ? e.target?.files?.[0] : null;

    if (fi) {
      if (onChangeFile) {
        onChangeFile(fi);
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
    if (onChangeFile) {
      onChangeFile(null);
    }
  };

  const stylePreviewImage = {
    height: height,
    width: width,
  };
  const styleDesImage = {
    width: width,
  };

  useEffect(() => {
    if (file) {
      setFileName(file!.name);
      if (file) {
        setImagePath(URL.createObjectURL(file));
      }
    } else {
      setFileName("No selected file");
      setImagePath(null);
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
        onChange={onChange}
        hidden
      />
      <div
        className="imageSelect"
        onClick={handleClick}
        style={stylePreviewImage}
      >
        {imagePath ? (
          <img className="previewImage" src={imagePath} alt="" />
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
      {errorMessage?.length! > 0 ? (
        <span className="imageInputErrorMessage">{`*${errorMessage}`}</span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageInput;
