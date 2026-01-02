// import React, { useState } from "react";

// const ImageUploadBox = ({ label, imageUrl, onUpload, type }) => {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleSelect = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//     setMessage("");
//   };

//   const handleUpload = async () => {
//     try {
//       await onUpload(file);
//       setMessage(`${label} uploaded successfully ✅`);
//       setFile(null);
//       setPreview(null);
//     } catch {
//       setMessage(`Failed to upload ${label} ❌`);
//     }
//   };

//   return (
//     <div className="border rounded-xl p-4 space-y-3 bg-gray-50">
//       <p className="text-sm font-semibold text-gray-700">{label}</p>

//       {/* CURRENT IMAGE */}
//       {imageUrl ? (
//         <img
//           src={imageUrl}
//           alt={label}
//           className="h-28 mx-auto object-contain bg-white rounded border"
//         />
//       ) : (
//         <div className="h-28 flex items-center justify-center border border-dashed rounded text-xs text-gray-400 bg-white">
//           No image uploaded
//         </div>
//       )}

//       {/* PREVIEW */}
//       {preview && (
//         <div className="border rounded bg-white p-2">
//           <p className="text-xs text-gray-500 mb-1">Preview</p>
//           <img src={preview} className="h-24 mx-auto object-contain" />
//         </div>
//       )}

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleSelect}
//         className="text-xs"
//       />

//       <button
//         disabled={!file}
//         onClick={handleUpload}
//         className="w-full bg-blue-600 text-white text-xs py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//       >
//         Upload {type}
//       </button>

//       {message && (
//         <p className="text-xs text-green-600 text-center">{message}</p>
//       )}
//     </div>
//   );
// };

// export default ImageUploadBox;
import React, { useState } from "react";
import { resolveImageUrl } from "../../../utils/imageUtils";

const ImageUploadBox = ({ label, imageUrl, onUpload }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onUpload(file);
  };

  return (
    <div className="border rounded-xl p-4 bg-gray-50 text-center space-y-3">
      <p className="text-xs text-gray-600">{label}</p>

      <img
        src={preview || resolveImageUrl(imageUrl) || "/image-placeholder.png"}
        className="h-32 mx-auto object-contain bg-white p-2 border rounded"
      />

      <label className="block">
        <input type="file" hidden onChange={handleFile} />
        <span className="text-xs cursor-pointer bg-blue-600 text-white px-3 py-1 rounded">
          Upload
        </span>
      </label>
    </div>
  );
};

export default ImageUploadBox;
