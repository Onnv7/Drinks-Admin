import React, { ChangeEvent, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import ImageInput from "../../../shared/imageInput/ImageInput";
const AddImage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fi = e.target?.files?.[0] ? e.target?.files?.[0] : null;
    if (fi !== null) {
      setFiles([...files, fi]);
    }
  };
  return (
    <div className="imagesContainer">
      {files.map((it) => {
        return <ImageInput key={uuidv4()} file={it} />;
      })}
      <ImageInput onChange={onChange} />
    </div>
  );
};

export default AddImage;
