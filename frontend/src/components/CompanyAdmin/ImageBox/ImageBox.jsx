import React, { useState, useMemo } from "react";
import { resolveImageUrl } from "../../../utils/imageUtils";

const ImageBox = ({ label, url }) => {
  const finalUrl = useMemo(() => resolveImageUrl(url), [url]);
  const [error, setError] = useState(false);

  return (
    <div className="border rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50">
      <p className="text-xs text-gray-500 mb-2">{label}</p>

      {!finalUrl || error ? (
        <div className="h-32 w-full flex items-center justify-center border border-dashed rounded text-xs text-gray-400 bg-white">
          No image uploaded
        </div>
      ) : (
        <img
          key={finalUrl}
          src={finalUrl}
          alt={label}
          className="max-h-32 object-contain bg-white p-2 rounded border"
          loading="lazy"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export default ImageBox;
