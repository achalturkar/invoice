import React, { useState } from "react";
import { companyImageUrl } from "../../../utils/companyImageUrl";
import { API_BASE, getToken } from "../../../config/api";
import { Camera } from "lucide-react";


const ImageBox = ({ label, companyId, type }) => {
  const [refresh, setRefresh] = useState(Date.now());
  const [uploading, setUploading] = useState(false);

  const imageSrc = `${companyImageUrl(companyId, type)}?v=${refresh}`;

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    await fetch(
      `${API_BASE}/api/company/${companyId}/image/${type}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      }
    );

    setUploading(false);
    setRefresh(Date.now()); // force reload
  };

  return (
    <div className="relative bg-white border rounded-xl p-4 flex flex-col items-center gap-3">
      <p className="text-sm font-semibold text-gray-700">{label}</p>

      <div className="relative w-32 h-32 border rounded-lg flex items-center justify-center overflow-hidden">
        <img
          src={imageSrc}
          alt={label}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "/placeholder-image.jpg";
          }}
        />

        <label className="absolute bottom-2 right-2 bg-gray-100 text-black text-xs p-2 rounded-full cursor-pointer shadow">
            <Camera/>
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            accept="image/png,image/jpeg,image/webp"
          />
        </label>
      </div>

      {uploading && (
        <p className="text-xs text-gray-400">Uploading...</p>
      )}
    </div>
  );
};

export default ImageBox;
