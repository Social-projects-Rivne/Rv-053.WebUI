import React, { useState } from "react";

import "./ImageUpload.css";

const ImageUpload = props => {
  const [file, setFile] = useState({ file: "", imagePreviewUrl: "" });
  const handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };
  props.onGetImg(file.file);

  let { imagePreviewUrl } = file;
  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = <img src={imagePreviewUrl} />;
  } else {
    $imagePreview = <img className="defaultImg" src="./src/img/logo.png" />;
  }

  return (
    <div className="previewComponent row">
      <div className="cover-edit">
        <input
          type="file"
          id="imageUpload"
          name={props.name}
          accept=".png, .jpg, .jpeg"
          onChange={handleImageChange}
        />
        <label htmlFor="imageUpload" />
      </div>
      <div className="imgPreview col-md-12">{$imagePreview}</div>
    </div>
  );
};
export default ImageUpload;
