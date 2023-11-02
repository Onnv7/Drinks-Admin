import React, { ChangeEvent, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import ImageInput from "../../../shared/imageInput/ImageInput";
const AddImage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const onChange = (file: File | null) => {
    if (file !== null) {
      setFiles([...files, file]);
    }
  };
  return (
    <div className="imagesContainer">
      {files.map((it) => {
        return <ImageInput key={uuidv4()} file={it} />;
      })}
      <ImageInput onChangeFile={onChange} />
    </div>
  );
};

export default AddImage;
