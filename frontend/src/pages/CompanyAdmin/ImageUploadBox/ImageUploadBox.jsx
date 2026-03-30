
import React, { useState } from "react";

const ImageUploadBox = ({ label, imageUrl, onUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onUpload(file);
  };

  return (
    <div className="border rounded-xl p-4 text-center space-y-3 bg-gray-50">
      <p className="text-xs font-medium">{label}</p>

      <img
        src={preview || imageUrl || "/image-placeholder.png"}
        alt={label}
        className="h-32 mx-auto object-contain bg-white border rounded"
      />

      <label className="cursor-pointer text-xs bg-indigo-600 text-white px-4 py-1.5 rounded-lg inline-block">
        Upload
        <input type="file" hidden onChange={handleFile} />
      </label>
    </div>
  );
};

export default ImageUploadBox;
